import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ngay = (a) => {
    const year = Math.floor(a / 10000);
    const month = Math.floor((a / 100) % 100);
    const day = a % 100;
    return `${year}/${month}/${day}`;
};

const ProductManagement = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8000/v1/app/products/");
            setProducts(response.data);
            setInitialData(response.data);
        } catch (error) {
            console.error("Có lỗi khi lấy dữ liệu:", error);
        }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length >= 3) {
        try {
          const response = await axios.post(
            'http://localhost:8000/v1/app/products/search_product',
            { data: query }
          );
          setProducts(response.data);
        } catch (error) {
          console.error('Có lỗi khi tìm kiếm:', error);
        }
      } else {
        setProducts(initialData);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, initialData]);

  return (
    <div className="p-4">
      <div className="flex items-center p-4 bg-gray-200">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          onChange={e => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full text-sm" // Thay đổi kích thước phông chữ ở ô input
        />
      </div>

      <table className="w-full text-left mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b border-gray-300 text-sm">Số thứ tự</th>
            <th className="p-2 border-b border-gray-300 text-sm">Tên sản phẩm</th>
            <th className="p-2 border-b border-gray-300 text-sm">Giá bán</th>
            <th className="p-2 border-b border-gray-300 text-sm">Giá mua</th>
            <th className="p-2 border-b border-gray-300 text-sm">Ngày sản xuất</th>
            <th className="p-2 border-b border-gray-300 text-sm">Hạn sử dụng</th>
            <th className="p-2 border-b border-gray-300 text-sm">Mô tả</th>
            <th className="p-2 border-b border-gray-300 text-sm">Mức cảnh báo</th>
            <th className="p-2 border-b border-gray-300 text-sm">Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={`${product.stock < product.warnningLevel ? 'bg-yellow-300' : ''}`}
            >
              <td className="p-2 border-b border-gray-300 text-sm">{index + 1}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{product.name}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{product.prices.price}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{product.prices.purchasePrice}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{ngay(product.productInfo.mfg)}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{ngay(product.productInfo.exp)}</td>
              <td className="p-2 border-b border-gray-300 text-sm">
                {product.productInfo.description.length > 50
                  ? `${product.productInfo.description.substring(0, 50)}...`
                  : product.productInfo.description}
              </td>
              <td className="p-2 border-b border-gray-300 text-sm">{product.warnningLevel}</td>
              <td className="p-2 border-b border-gray-300 text-sm">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
