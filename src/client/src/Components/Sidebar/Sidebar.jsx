import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    HomeIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    ShoppingCartIcon,
    UserIcon,
    UsersIcon,
    ReceiptPercentIcon,
} from "@heroicons/react/24/outline";

import handleDashboardClick from "./handleDashboardClick";
import handleProfileClick from "./handleProfileClick";
import handleSettingsClick from "./handleSettingsClick";
import handleLogoutClick from "./handleLogoutClick";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    // Kiểm tra có data trong Local không, nếu không có trả lại trang "/"
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                const savedUserJSON = JSON.parse(savedUser);
                if (savedUserJSON && savedUserJSON.user_datas) {
                    setUser(savedUserJSON.user_datas);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Invalid user data:", error);
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    // Tạo URL cho avatar từ API
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
    )}&background=random&color=fff`;

    // Hàm xử lý khi nhấn vào tùy chọn
    const handleItemClick = (item) => {
        setActiveItem(item); // Cập nhật tùy chọn đang được chọn
    };

    // Sử dụng useEffect để tự động gập sidebar khi màn hình nhỏ hơn 900px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };
        handleResize();

        // Lắng nghe sự thay đổi kích thước cửa sổ
        window.addEventListener("resize", handleResize);

        // Cleanup listener khi component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const menuItems = [
        {
            name: "Dashboard",
            icon: <HomeIcon className="w-6 h-6" />,
            onClick: () => {
                handleDashboardClick();
                setActiveItem("Dashboard");
            },
            link: "/dashboard",
        },
        {
            name: "Quản lý nhân viên",
            icon: <UsersIcon className="w-6 h-6" />,
            onClick: () => {
                handleProfileClick();
                setActiveItem("Quản lý nhân viên");
            },
            link: "/employee_management",
        },
        {
            name: "Quản Lý Sản Phẩm",
            icon: <ShoppingCartIcon className="w-6 h-6" />,
            onClick: () => {
                handleProfileClick();
                setActiveItem("Quản Lý Sản Phẩm");
            },
            link: "/product_management",
        },
        {
            name: "Tạo hóa đơn",
            icon: <ReceiptPercentIcon className="w-6 h-6" />,
            onClick: () => {
                handleProfileClick();
                setActiveItem("Tạo hóa đơn");
            },
            link: "/create_invoicet",
        },
        // {
        //     name: "Xem Trước Hóa Đơn",
        //     icon: <ReceiptPercentIcon className="w-6 h-6" />,
        //     onClick: () => handleProfileClick(),
        //     link: "/invoice_preview",
        // },
        {
            name: "Settings",
            icon: <Cog6ToothIcon className="w-6 h-6" />,
            onClick: () => {
                handleSettingsClick();
                setActiveItem("Settings");
            },
            link: "/settings",
        },
        {
            name: "Logout",
            icon: <ArrowLeftOnRectangleIcon className="w-6 h-6" />,
            onClick: () => {
                handleLogoutClick();
                setActiveItem("Logout");
            },
            link: "/",
        },
    ];

    return (
        <div
            className={`flex flex-col h-screen bg-white text-gray-800 ${
                isCollapsed ? "w-20" : "w-64"
            } rounded-tr-lg rounded-br-lg overflow-hidden`} // Thêm overflow-hidden và bo góc bên phải
        >
            {/* Container cho nút thu nhỏ/phóng to và tên ứng dụng */}
            <div className="flex items-center p-4">
                {/* Nút thu nhỏ/phóng to Sidebar */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center justify-center w-10 h-10 mr-2"
                >
                    <Bars3Icon className="w-6 h-6 text-gray-800" />
                </button>
                {/* Tên ứng dụng */}
                <div
                    className={`text-lg font-bold ${
                        isCollapsed ? "hidden" : "block"
                    }`}
                >
                    Codinglab
                </div>
            </div>

            {/* Navigation links với khả năng cuộn */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
                <ul className="p-4 space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.link}
                                className={`flex items-center p-2 ${
                                    activeItem === item.name
                                        ? "bg-[#4071F4] text-white"
                                        : "text-[#818181] hover:bg-[#4071F4] hover:text-white"
                                } rounded`}
                                onClick={item.onClick}
                            >
                                {React.cloneElement(item.icon, {
                                    className: `w-6 h-6 mr-2 ${
                                        activeItem === item.name ||
                                        (activeItem === null &&
                                            "hover:text-white")
                                    }`,
                                })}
                                {!isCollapsed && item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Avatar hiển thị hình ảnh từ API ở cuối sidebar */}
            <div className="flex items-center justify-start p-4">
                <img
                    src={avatarUrl} // Sử dụng avatar từ API với các tham số mới
                    alt="Avatar"
                    className={`rounded-full w-12 h-12`} // Đặt kích thước avatar cố định
                />
                {/* Nhóm tên và chức vụ thành một khối */}
                <div
                    className={`ml-2 ${
                        isCollapsed ? "hidden" : "flex flex-col"
                    }`}
                >
                    <p className="text-lg font-semibold whitespace-nowrap">
                        {user.name}
                    </p>
                    {/* Tên người dùng hiển thị bên cạnh avatar */}
                    <p className="text-sm text-gray-600">
                        {user.role === 0
                            ? "Người quản lý"
                            : user.role === 1
                            ? "Nhân viên bán hàng"
                            : user.role === 2
                            ? "Nhân viên kho hàng"
                            : "Helo"}
                        {/* Hiển thị chức vụ của người dùng */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
