import React, { useEffect, useState } from "react";
import axios from "axios";

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/statistics?month=${selectedMonth}`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="card p-4">
      <h2>Statistics for {selectedMonth}</h2>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Sales</h5>
            <p>${statistics.totalSales.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Sold Items</h5>
            <p>{statistics.soldItems}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Not Sold Items</h5>
            <p>{statistics.notSoldItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;
