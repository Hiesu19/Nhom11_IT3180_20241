import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ProductForm from "./ProductForm";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const navigate = useNavigate();

    //Lây data sản phẩm lưu vào product
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(
                    `http://localhost:8000/v1/app/products/info/${id}`,
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );
                // Trả về kiểu dữ liệu Date
                const product = response.data;
                if (product.productInfo.mfg) {
                    product.productInfo.mfg = new Date(product.productInfo.mfg);
                }
                if (product.productInfo.exp) {
                    product.productInfo.exp = new Date(product.productInfo.exp);
                }
                setProduct(response.data);
                setEditedProduct(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };
        fetchProductDetail();
    }, [id]);

    // Công tắc chỉnh sửa
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá
        if (name === "price") {
            setEditedProduct((prev) => ({
                ...prev,
                prices: {
                    ...prev.prices,
                    price: value,
                },
            }));
        }
        // Cập nhật giá mua
        else if (name === "purchasePrice") {
            setEditedProduct((prev) => ({
                ...prev,
                prices: {
                    ...prev.prices,
                    purchasePrice: value,
                },
            }));
        }
        // Cập nhật productID
        else if (name === "productID") {
            setEditedProduct((prev) => ({
                ...prev,
                productID: value,
            }));
        }
        // Cập nhật tên sản phẩm
        else if (name === "name") {
            setEditedProduct((prev) => ({
                ...prev,
                name: value,
            }));
        }
        // Cập nhật ngày sản xuất (mfg)
        else if (name === "mfg") {
            setEditedProduct((prev) => ({
                ...prev,
                productInfo: {
                    ...prev.productInfo,
                    mfg: new Date(value),
                },
            }));
        }
        // Cập nhật ngày hết hạn (exp)
        else if (name === "exp") {
            setEditedProduct((prev) => ({
                ...prev,
                productInfo: {
                    ...prev.productInfo,
                    exp: new Date(value),
                },
            }));
        }
        // Cập nhật mô tả
        else if (name === "description") {
            setEditedProduct((prev) => ({
                ...prev,
                productInfo: {
                    ...prev.productInfo,
                    description: value,
                },
            }));
        }
        // Cập nhật mã vạch
        else if (name === "barcode") {
            setEditedProduct((prev) => ({
                ...prev,
                productInfo: {
                    ...prev.productInfo,
                    barcode: value,
                },
            }));
        }
        // Cập nhật số lượng trong kho
        else if (name === "stock") {
            setEditedProduct((prev) => ({
                ...prev,
                stock: value,
            }));
        }
        // Cập nhật mức cảnh báo
        else if (name === "warningLevel") {
            setEditedProduct((prev) => ({
                ...prev,
                warningLevel: value,
            }));
        }
    };

    // Hàm cập nhập sản phẩm
    const handleSave = async () => {
        
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            await axios.put(
                `http://localhost:8000/v1/app/products/${id}`,
                editedProduct,
                {
                    headers: {
                        token: `Bearer ${token.accessToken}`,
                    },
                }
            );
            setProduct(editedProduct);
            setIsEditing(false);
            Swal.fire({
                title: "Cập nhật thành công!",
                text: "Sản phẩm đã được cập nhật.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            Swal.fire({
                title: "Lỗi!",
                text: "Không thể cập nhật sản phẩm.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // Hàm xoá sản phẩm
    const handleDelete = () => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xoá sản phẩm này?",
            text: "Hành động này không thể hoàn tác.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xoá",
            cancelButtonText: "Hủy",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = JSON.parse(localStorage.getItem("user"));
                    await axios.delete(
                        `http://localhost:8000/v1/app/products/${id}`,
                        {
                            headers: {
                                token: `Bearer ${token.accessToken}`,
                            },
                        }
                    );
                    Swal.fire({
                        title: "Xoá thành công!",
                        text: "Sản phẩm đã được xoá.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    navigate(-1); // Quay lại trang trước
                } catch (error) {
                    console.error("Lỗi khi xoá sản phẩm:", error);
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Không thể xoá sản phẩm.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    if (!product) {
        return <p>Đang tải...</p>;
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
                Go Back
            </button>
            {/* Form hiển thị và chỉnh sửa sản phẩm */}
            <ProductForm
                product={editedProduct}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
            />
            {/* Các nút hành động */}
            <div className="flex justify-between mt-8">
                {isEditing ? (
                    <>
                        <button
                            onClick={() =>
                                setIsEditing(!isEditing)
                            } // Điều hướng về trang chi tiết sản phẩm
                            className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
                        >
                            Huỷ
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                        >
                            Lưu
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEditToggle}
                        className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200"
                    >
                        Chỉnh sửa
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                    Xoá
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
