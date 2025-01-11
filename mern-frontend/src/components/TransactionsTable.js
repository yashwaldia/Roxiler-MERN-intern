import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more transactions
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions?month=${selectedMonth}&page=${page}&search=${search}&perPage=3`
        );
        const { transactions, totalCount, hasMore } = response.data;

        if (transactions.length === 0 && page === 1) {
          setNoResults(true); // Show no results if first page has no data
        } else {
          setTransactions(transactions);
          setNoResults(false);
          setHasMore(hasMore); // Set the flag if there are more results
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, page, search]);

  // Reset to page 1 when the selected month changes
  useEffect(() => {
    setPage(1);
    setNoResults(false);
    setHasMore(true); // Reset the 'hasMore' flag when month changes
  }, [selectedMonth]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {transactions.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
              <th>Category</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price.toFixed(2)}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">{noResults ? 'No Results Found' : 'Loading...'}</p>
      )}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
