import React from 'react';

const Dropdown = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="form-select mb-3"
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
