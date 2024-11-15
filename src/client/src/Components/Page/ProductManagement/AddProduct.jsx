// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddProduct = () => {
//   const [productData, setProductData] = useState({
//     productID: '',
//     name: '',
//     prices: {
//       price: '',
//       purchasePrice: '',
//     },
//     productInfo: {
//       mfg: '',
//       exp: '',
//       description: '',
//       barcode: '',
//     },
//     stock: '',
//     warningLevel: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const field = name.split('.');

//     if (field.length === 2) {
//       // Xử lý các trường lồng nhau như prices và productInfo
//       setProductData((prevData) => ({
//         ...prevData,
//         [field[0]]: {
//           ...prevData[field[0]],
//           [field[1]]: value,
//         },
//       }));
//     } else {
//       // Xử lý các trường ngoài lồng nhau
//       setProductData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form data to be submitted:", productData); // Kiểm tra dữ liệu

//     // Kiểm tra token hợp lệ
//     const token = JSON.parse(localStorage.getItem("user"));
//     if (!token || !token.accessToken) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'You need to login first!',
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/v1/app/products/add_product',
//         productData,
//         {
//           headers: {
//             token: `Bearer ${token.accessToken}`,
//           },
//         }
//       );

//       console.log('Product added successfully:', response.data);
//       Swal.fire({
//         icon: 'success',
//         title: 'Product added successfully!',
//         text: 'The product has been successfully added.',
//       });

//       // Reset form data
//       setProductData({
//         productID: '',
//         name: '',
//         prices: { price: '', purchasePrice: '' },
//         productInfo: { mfg: '', exp: '', description: '', barcode: '' },
//         stock: '',
//         warningLevel: '',
//       });
//     } catch (error) {
//       console.error('Error adding product:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to add product!',
//         text: 'There was an error while adding the product. Please try again.',
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Tạo Sản Phẩm Mới</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Product ID and Name */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="productID"
//             value={productData.productID}
//             onChange={handleChange}
//             placeholder="Product ID"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="text"
//             name="name"
//             value={productData.name}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Price and Purchase Price */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="prices.price"
//             value={productData.prices.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="number"
//             name="prices.purchasePrice"
//             value={productData.prices.purchasePrice}
//             onChange={handleChange}
//             placeholder="Purchase Price"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="date"
//             name="productInfo.mfg"
//             value={productData.productInfo.mfg}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="date"
//             name="productInfo.exp"
//             value={productData.productInfo.exp}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Description and Barcode */}
//         <div className="grid grid-cols-1 gap-4">
//           <textarea
//             name="productInfo.description"
//             value={productData.productInfo.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="p-2 border border-gray-300 rounded-md w-full"
//           />
//           <input
//             type="text"
//             name="productInfo.barcode"
//             value={productData.productInfo.barcode}
//             onChange={handleChange}
//             placeholder="Barcode"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Stock and Warning Level */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="stock"
//             value={productData.stock}
//             onChange={handleChange}
//             placeholder="Stock Quantity"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="number"
//             name="warningLevel"
//             value={productData.warningLevel}
//             onChange={handleChange}
//             placeholder="Warning Level"
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-blue-700"
//         >
//           Tạo
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productID: '',
    name: '',
    prices: {
      price: '',
      purchasePrice: '',
    },
    productInfo: {
      mfg: '',
      exp: '',
      description: '',
      barcode: '',
    },
    stock: '',
    warningLevel: '',
  });

  const navigate = useNavigate();  // Hook để điều hướng

  const handleChange = (e) => {
    const { name, value } = e.target;
    const field = name.split('.');

    if (field.length === 2) {
      // Xử lý các trường lồng nhau như prices và productInfo
      setProductData((prevData) => ({
        ...prevData,
        [field[0]]: {
          ...prevData[field[0]],
          [field[1]]: value,
        },
      }));
    } else {
      // Xử lý các trường ngoài lồng nhau
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data to be submitted:", productData); // Kiểm tra dữ liệu

    // Kiểm tra token hợp lệ
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token || !token.accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/v1/app/products/add_product',
        productData,
        {
          headers: {
            token: `Bearer ${token.accessToken}`,
          },
        }
      );

      console.log('Product added successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Product added successfully!',
        text: 'The product has been successfully added.',
      });

      // Reset form data
      setProductData({
        productID: '',
        name: '',
        prices: { price: '', purchasePrice: '' },
        productInfo: { mfg: '', exp: '', description: '', barcode: '' },
        stock: '',
        warningLevel: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add product!',
        text: 'There was an error while adding the product. Please try again.',
      });
    }
  };

  const handleCancel = () => {
    // Chuyển hướng về trang ProductList khi nhấn nút hủy
    navigate('/product_management');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tạo Sản Phẩm Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product ID and Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="productID"
            value={productData.productID}
            onChange={handleChange}
            placeholder="Product ID"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price and Purchase Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="prices.price"
            value={productData.prices.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="prices.purchasePrice"
            value={productData.prices.purchasePrice}
            onChange={handleChange}
            placeholder="Purchase Price"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="productInfo.mfg"
            value={productData.productInfo.mfg}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            name="productInfo.exp"
            value={productData.productInfo.exp}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description and Barcode */}
        <div className="grid grid-cols-1 gap-4">
          <textarea
            name="productInfo.description"
            value={productData.productInfo.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="productInfo.barcode"
            value={productData.productInfo.barcode}
            onChange={handleChange}
            placeholder="Barcode"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Stock and Warning Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="warningLevel"
            value={productData.warningLevel}
            onChange={handleChange}
            placeholder="Warning Level"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
