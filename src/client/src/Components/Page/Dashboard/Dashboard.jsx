import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {
  InboxIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UsersIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dữ liệu cho biểu đồ doanh thu
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 15000, 11000, 17000, 14000, 19000, 16000],
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white shadow p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">  
        <OverviewCard color="blue" icon={<ShoppingCartIcon className="h-6 w-6 text-blue-500" />} label="Orders" value="1,230" />  
        <OverviewCard color="green" icon={<CurrencyDollarIcon className="h-6 w-6 text-green-500" />} label="Revenue" value="$45,320" />  
        <OverviewCard color="yellow" icon={<InboxStackIcon className="h-6 w-6 text-yellow-500" />} label="Products in Stock" value="340" />  
        <OverviewCard color="red" icon={<UsersIcon className="h-6 w-6 text-red-500" />} label="Customers" value="5,670" />  
      </div>

      {/* Sales Overview Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// Component cho các thẻ Overview
const OverviewCard = ({ color, icon, label, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-500 mr-4`}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-600">{label}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
