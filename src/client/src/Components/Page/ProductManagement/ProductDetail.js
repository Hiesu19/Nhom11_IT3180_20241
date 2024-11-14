import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(
                    `http://localhost:8000/v1/app/products/${id}`,
                    {
                        headers: {
                            token: `Bearer ${token.accessToken}`,
                        },
                    }
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductDetail();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p><strong>Mã sản phẩm:</strong> {product.productID}</p>
            <p><strong>Giá bán:</strong> {product.prices.price}</p>
            <p><strong>Mô tả:</strong> {product.productInfo.description}</p>
            <p><strong>Số lượng còn lại:</strong> {product.stock}</p>
            <p><strong>Mức cảnh báo:</strong> {product.warningLevel}</p>
            {/* Display other fields as necessary */}
        </div>
    );
};

export default ProductDetail;
