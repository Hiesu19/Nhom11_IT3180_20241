import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ data }) => {
  const dates = Object.keys(data);
  const totalInvoices = dates.map((date) => data[date].totalInvoices);
  const cash = dates.map((date) => data[date].cash);
  const bank = dates.map((date) => data[date].bank);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Total Invoices",
        data: totalInvoices,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Cash",
        data: cash,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Bank",
        data: bank,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RevenueChart;
