import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedMonth }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pie-chart?month=${selectedMonth}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="card p-3">
        <h3>Pie chart stats - {selectedMonth}</h3> {/* Displaying the selected month */}
        <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
