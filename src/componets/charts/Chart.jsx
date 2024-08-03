import React from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AccountStats = ({ account }) => {
  const { incomings, stats, title } = account;

  const incomeData = incomings.map((incoming) => incoming.amount); // Assuming incomings have an amount field

  const lineChartData = {
    labels: incomings.map((_, index) => `Income ${index + 1}`), // Example labels
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income Line Chart",
      },
    },
  };

  const pieChartData = {
    labels: ["Balance", "Expenses", "Profit"],
    datasets: [
      {
        data: [stats.balance, stats.expense, stats.profit],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses Pie Chart",
      },
    },
  };

  return (
    <div>
      <div className="charts">
        <div className="line-chart">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="pie-chart">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
