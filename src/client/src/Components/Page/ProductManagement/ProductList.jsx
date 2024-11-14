import React, { useState, useEffect } from "react";
import axios from "axios";

const removeDiacritics = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const ngay = (a) => {
    const year = a.toString().slice(0, 4);
    const month = a.toString().slice(5, 7);
    const day = a.toString().slice(8, 10);
    return `${year}/${month}/${day}`;
};

const ProductManagement = () => {
    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [initialData, setInitialData] = useState([]);
    // State lưu accessToken
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Lấy token từ localStorage và lưu vào state
        const storedToken = JSON.parse(localStorage.getItem("user"));
        if (storedToken) {
            setAccessToken(storedToken.accessToken);
        }
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Gọi API lấy toàn bộ sản phẩm
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(
                    "http://localhost:8000/v1/app/products/",
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );

                setProducts(response.data);
                setInitialData(response.data);
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        // Lọc sản phẩm, ưu tiên productID rồi mới đến name
        const filterProducts = () => {
            if (query.length >= 3) {
                const normalizedKeyword = removeDiacritics(query);
                const filteredProducts = initialData.filter((product) => {
                    const normalizedProductID = removeDiacritics(
                        product.productID
                    );
                    const normalizedProductName = removeDiacritics(
                        product.name
                    );

                    return (
                        normalizedProductID.includes(normalizedKeyword) ||
                        normalizedProductName.includes(normalizedKeyword)
                    );
                });
                setProducts(filteredProducts);
            } else {
                setProducts(initialData);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            filterProducts();
        }, 200);

        return () => clearTimeout(delayDebounceFn);
    }, [query, initialData]);

    return (
        <div className="p-4">
            <div className="flex items-center p-4 bg-gray-200">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full text-sm" // Thay đổi kích thước phông chữ ở ô input
                />
            </div>

            <table className="w-full text-left mt-4 border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Số thứ tự
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Tên sản phẩm
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Giá bán
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Giá mua
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Ngày sản xuất
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Hạn sử dụng
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Mô tả
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Mức cảnh báo
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Số lượng
                        </th>
                        <th className="p-2 border-b border-gray-300 text-sm">
                            Đã bán
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr
                            key={product._id}
                            className={`${
                                product.stock < product.warningLevel
                                    ? "bg-yellow-300"
                                    : ""
                            }`}
                        >
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {index + 1}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.name}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.prices.price}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.prices.purchasePrice}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {ngay(product.productInfo.mfg)}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {ngay(product.productInfo.exp)}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.productInfo.description.length > 50
                                    ? `${product.productInfo.description.substring(
                                          0,
                                          50
                                      )}...`
                                    : product.productInfo.description}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.warningLevel}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.stock}
                            </td>
                            <td className="p-2 border-b border-gray-300 text-sm">
                                {product.sold}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;
