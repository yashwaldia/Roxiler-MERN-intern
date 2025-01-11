import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from './components/Dropdown';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default month is March

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">TRANSACTIONS DASHBOARD</h1>
      
      {/* Dropdown for month selection */}
      <Dropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      
      {/* Statistics Box */}
      <StatisticsBox selectedMonth={selectedMonth} />
      
      {/* Transactions Table */}
      <TransactionsTable selectedMonth={selectedMonth} />
      
      {/* Charts Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <BarChart selectedMonth={selectedMonth} />
        </div>
        <div className="col-md-6">
          <PieChart selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
};

export default App;
