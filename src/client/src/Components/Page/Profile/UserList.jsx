import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [employees, setEmployees] = useState([]); // State để lưu dữ liệu từ API

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8000/v1/user");
                setEmployees(response.data); // Cập nhật state với dữ liệu nhận được
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchEmployees(); // Gọi hàm
    }, []);

    // Hàm xử lý xóa nhân viên
    const handleDelete = (id) => {
        console.log("Xóa nhân viên với ID:", id);
        // Thêm logic xóa nhân viên tại đây
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
                        <th className="py-2 px-4 border-b text-center w-1/6">ID</th>  
                        <th className="py-2 px-4 border-b text-center w-1/3">Tên</th>  
                        <th className="py-2 px-4 border-b text-center w-1/3">Chức vụ</th>  
                        <th className="py-2 px-4 border-b text-center w-1/6">Hành động</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {employees.map(employee => (  
                        <tr key={employee.id} className="hover:bg-gray-50">  
                            <td className="py-2 px-4 border-b text-center">{employee.username}</td>  
                            <td className="py-2 px-4 border-b text-center">{employee.name}</td>  
                            <td className="py-2 px-4 border-b text-center">{employee.role === 0
                            ? "Người quản lý"
                            : employee.role === 1
                            ? "Nhân viên bán hàng"
                            : employee.role === 2
                            ? "Nhân viên kho hàng"
                            : "Helo"}</td>  
                            <td className="py-2 px-4 border-b text-center">
                                <div className="inline-flex space-x-2"> {/* Inline và khoảng cách giữa các nút */}
                                    <button 
                                        className="bg-red-500 text-white text-sm px-2 py-1 rounded" 
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Xóa NV
                                    </button>
                                    <button 
                                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded" 
                                        onClick={() => handleEdit(employee.id)}
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
