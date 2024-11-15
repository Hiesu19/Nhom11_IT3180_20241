import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";

function InvoicePreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { items, total } = state || { items: [], total: 0 };
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Tạo URL Momo QR
  const momoPhoneNumber = "0358528105"; // Thay bằng số điện thoại Momo của bạn
  const paymentMessage = `Thanh toan hoa don ${total} VND`;
  const momoQRCodeURL = `https://payment.momo.vn?phone=${momoPhoneNumber}&amount=${total}&message=${encodeURIComponent(
    paymentMessage
  )}`;

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Thông tin hóa đơn
        </h1>

        <table className="w-full border border-gray-300 mt-6 table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">Tên Sản Phẩm</th>
              <th className="px-4 py-2 border">Số Lượng</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.product}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4 text-lg">
          <strong>Tổng Tiền: {total} VND</strong>
        </div>

        {/* Tùy chọn phương thức thanh toán */}
        <div className="flex justify-between mt-4 space-x-4">
          <button
            onClick={() => handlePaymentMethodChange("cash")}
            className={`w-1/2 px-4 py-2 rounded ${
              paymentMethod === "cash"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Thanh toán Tiền mặt
          </button>
          <button
            onClick={() => handlePaymentMethodChange("banking")}
            className={`w-1/2 px-4 py-2 rounded ${
              paymentMethod === "banking"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Thanh toán Chuyển khoản
          </button>
        </div>

        {/* Hiển thị QR Code nếu chọn phương thức thanh toán là Chuyển khoản */}
        {paymentMethod === "banking" && (
          <div className="flex justify-center mt-6">
            <QRCode value={momoQRCodeURL} />
          </div>
        )}

        {paymentMethod === "banking" && (
          <p className="text-center mt-4">
            Quét mã QR bằng ứng dụng Momo để thanh toán.
          </p>
        )}

        <button
          onClick={() => navigate("/create_invoicet")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Quay Lại Tạo Hóa Đơn
        </button>
      </div>
    </div>
  );
}

export default InvoicePreview;
