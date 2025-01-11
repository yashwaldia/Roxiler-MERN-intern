import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ selectedMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bar-chart?month=${selectedMonth}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const chartData = {
    labels: ["0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901+"],
    datasets: [
      {
        label: "Number of Items",
        data: data,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="card p-3">
        <h3>Bar chart stats - {selectedMonth}</h3> {/* Displaying the selected month */}
        <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
