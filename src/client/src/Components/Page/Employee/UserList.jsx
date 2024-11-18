import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    //State lưu nhân viên từ API
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // Gọi API lấy toàn bộ nhân viên
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(
                    "http://localhost:8000/v1/user",
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );

                // Cập nhật state với dữ liệu nhận được
                setEmployees(response.data);
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id, employeeName) => {
        const result = await Swal.fire({
            title: `Bạn có chắc chắn muốn xóa nhân viên ${employeeName}?`,
            text: `Bạn sẽ không thể phục hồi lại nhân viên!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa!",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                // Gọi API xoá nhân viên
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.delete(
                    `http://localhost:8000/v1/user/${id}`,
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );

                if (response.status !== 200) {
                    throw new Error("Lỗi khi xóa nhân viên");
                }

                // Cập nhật danh sách nhân viên sau khi xóa
                setEmployees(
                    employees.filter((employee) => employee._id !== id)
                );
                Swal.fire(
                    "Đã xóa!",
                    `Nhân viên ${employeeName} đã được xóa.`,
                    "success"
                );
            } catch (error) {
                console.error("Có lỗi xảy ra:", error);
                Swal.fire(
                    "Lỗi",
                    "Không thể xóa nhân viên. Vui lòng thử lại sau.",
                    "error"
                );
            }
        }
    };

    // Hàm xử lý chỉnh sửa nhân viên
    const handleEdit = (id) => {
        navigate(`/employee_management/edit/${id}`);
    };
    const handleDetail = (id) => {
        navigate(`/employee_management/detail/${id}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                Danh sách nhân viên
            </h2>
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-3 px-4 border-b text-center w-1/6">
                            ID
                        </th>
                        <th className="py-3 px-4 border-b text-center w-1/3">
                            Tên
                        </th>
                        <th className="py-3 px-4 border-b text-center w-1/3">
                            Chức vụ
                        </th>
                        <th className="py-3 px-4 border-b text-center w-1/6">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr
                            key={employee._id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="py-3 px-4 border-b text-center text-gray-600 font-bold">
                                {employee.username}
                            </td>
                            <td className="py-3 px-4 border-b text-center text-gray-600 font-bold">
                                {employee.name}
                            </td>
                            <td className="py-3 px-4 border-b text-center text-gray-600 font-bold">
                                {employee.role === "nv_ban_hang"
                                    ? "Nhân viên bán hàng"
                                    : employee.role === "ql_kho"
                                    ? "Nhân viên quản lý kho"
                                    : employee.role === "admin"
                                    ? "Admin"
                                    : "Chức vụ khác"}
                            </td>
                            <td className="py-3 px-4 border-b text-center">
                                <div className="inline-flex items-center space-x-3">
                                    <button
                                        className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
                                        onClick={() =>
                                            handleDetail(employee._id)
                                        }
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                                        onClick={() => handleEdit(employee._id)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
                                        onClick={() =>
                                            handleDelete(
                                                employee._id,
                                                employee.name
                                            )
                                        }
                                    >
                                        Xóa NV
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
