import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    CubeIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon,
    UsersIcon,
    InboxStackIcon,
} from "@heroicons/react/24/outline";

import RevenueChart from "./RevenueChart";

const Dashboard = () => {
    const [overviewData, setOverviewData] = useState(null); // Khởi tạo là null
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(
                    "http://localhost:8000/v1/app/dashboard",
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );

                const data = response.data;

                setOverviewData(data);
            } catch (err) {
                console.error("Error fetching overview data:", err);
                setError(
                    "Lỗi khi lấy dữ liệu từ server. Vui lòng thử lại sau."
                );
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!overviewData) {
        return <div>Loading...</div>;
    }
    console.log(overviewData);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="bg-white shadow p-4 rounded-lg mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </header>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <OverviewCard
                    color="blue"
                    icon={<CubeIcon className="h-6 w-6 text-blue-500" />}
                    label="Số Loại Sản Phẩm"
                    value={overviewData.productCount}
                />
                <OverviewCard
                    color="green"
                    icon={
                        <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                    }
                    label="Giá Trị Tồn Kho"
                    value={`$${overviewData.totalValue}`}
                />
                <OverviewCard
                    color="yellow"
                    icon={
                        <InboxStackIcon className="h-6 w-6 text-yellow-500" />
                    }
                    label="Tổng Số Sản Phẩm "
                    value={overviewData.totalProduct}
                />
                <OverviewCard
                    color="red"
                    icon={<UsersIcon className="h-6 w-6 text-red-500" />}
                    label="Tổng Số Nhân Viên"
                    value={overviewData.userCount}
                />
            </div>
            {/* <RevenueChart data={overviewData.invoiceAndRevenueByDate} /> */}
        </div>
    );
};

// Component cho các thẻ Overview
const OverviewCard = ({ color, icon, label, value }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div
                className={`p-3 rounded-full bg-${color}-100 text-${color}-500 mr-4`}
            >
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
