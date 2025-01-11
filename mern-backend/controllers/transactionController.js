const Transaction = require('../models/Transaction');
const axios = require('axios');

// Seed database
exports.seedDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.deleteMany(); // Clear old data
    await Transaction.insertMany(data); // Insert new data

    res.status(200).json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Error seeding database:', error.message);
    res.status(500).json({ message: 'Error seeding database', error });
  }
};

// Helper: Get month number from month name
const getMonthNumber = (month) => {
  return new Date(`${month} 1`).getMonth() + 1;
};

// List transactions
exports.getTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    const query = {};
    if (month) {
      const monthNumber = getMonthNumber(month);
      query.$expr = { $eq: [{ $month: '$dateOfSale' }, monthNumber] }; // Match month
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } },
      ];
    }

    // Count the total number of transactions for the given query (to check if there are more pages)
    const totalCount = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json({
      transactions,
      totalCount,
      hasMore: totalCount > page * perPage, // Determine if there are more transactions to show
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};


// Statistics
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = getMonthNumber(month);

    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
    });

    const totalSales = transactions.reduce((acc, t) => acc + t.price, 0);
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.filter((t) => !t.sold).length;

    res.status(200).json({ totalSales, soldItems, notSoldItems });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};

// Bar chart
exports.getBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = getMonthNumber(month);

    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
    });

    const priceRanges = Array(10).fill(0);
    transactions.forEach((t) => {
      const index = Math.min(Math.floor(t.price / 100), 9);
      priceRanges[index]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    console.error('Error fetching bar chart data:', error.message);
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};

// Pie chart
exports.getPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = getMonthNumber(month);

    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
    });

    const categories = {};
    transactions.forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + 1;
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching pie chart data:', error.message);
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
};
