import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserList = () => {
    //State lưu nhân viên từ API
    const [employees, setEmployees] = useState([]);

    //State lưu accessToken từ trong localStorage
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Lấy token từ localStorage và lưu vào state
        const storedToken = JSON.parse(localStorage.getItem("user"));
        if (storedToken) {
            setAccessToken(storedToken.accessToken);
        }
    }, []);

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
                const response = await axios.delete(
                    `http://localhost:8000/v1/user/${id}`,
                    {
                        headers: {
                            token: `Bearer ${accessToken}`,
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
        console.log("Chỉnh sửa nhân viên với ID:", id);
        // Thêm logic chỉnh sửa nhân viên tại đây
    };

    return (
        <div className="container mx-auto mt-5">
            <h2 className="text-2xl font-bold mb-4">Danh sách nhân viên</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-center w-1/6">
                            ID
                        </th>
                        <th className="py-2 px-4 border-b text-center w-1/3">
                            Tên
                        </th>
                        <th className="py-2 px-4 border-b text-center w-1/3">
                            Chức vụ
                        </th>
                        <th className="py-2 px-4 border-b text-center w-1/6">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">
                                {employee.username}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {employee.name}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {employee.role === "nv_ban_hang"
                                    ? "Nhân viên bán hàng"
                                    : employee.role === "ql_kho"
                                    ? "Nhân viên quản lý kho"
                                    : employee.role === "admin"
                                    ? "Admin"
                                    : "Chức vụ khác"}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <div className="inline-flex space-x-2">
                                    {" "}
                                    {/* Inline và khoảng cách giữa các nút */}
                                    <button
                                        className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() =>
                                            handleDelete(
                                                employee._id,
                                                employee.name
                                            )
                                        }
                                    >
                                        Xóa NV
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleEdit(employee._id)}
                                    >
                                        Chỉnh sửa
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
