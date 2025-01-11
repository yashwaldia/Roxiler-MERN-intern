const express = require('express');
const {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/init', seedDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);

module.exports = router;
