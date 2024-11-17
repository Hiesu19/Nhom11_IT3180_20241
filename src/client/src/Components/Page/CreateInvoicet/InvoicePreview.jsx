import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function InvoicePreview() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { items, total } = state || { items: [], total: 0 };
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [qrText, setQrText] = useState("");
    const [orderCode, setOrderCode] = useState("");
    const [orderStatus, setOrderStatus] = useState("PENDING");
    const [orderCheckInterval, setOrderCheckInterval] = useState(null);
    const [isQRCodeCancelled, setIsQRCodeCancelled] = useState(false); // Trạng thái hủy QR

    // Tạo URL QR
    const fetchAPIQRCode = async (amount) => {
        if (amount <= 0) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Giá trị đơn hàng không được bé hơn hoặc bằng 0!",
                confirmButtonText: "OK",
            });
            navigate(-1);
            return; // Dừng hàm nếu amount không hợp lệ
        }

        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(
                `http://localhost:8000/v1/app/payment/create-payment-link`,
                {
                    amount: amount,
                },
                {
                    headers: {
                        token: `Bearer ${token.accessToken}`,
                    },
                }
            );

            const payment = response.data;
            setQrText(payment.qrCodeText);
            setOrderCode(payment.orderCode);

            // Bắt đầu kiểm tra trạng thái thanh toán
            startCheckingOrderStatus(payment.orderCode);
        } catch (error) {
            console.error("Lỗi khi gọi API payment:", error);
        }
    };

    // Hàm kiểm tra trạng thái đơn hàng
    const checkOrderStatus = async (orderID) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(
                `http://localhost:8000/v1/app/payment/check-order`,
                {
                    orderID: orderID,
                },
                {
                    headers: {
                        token: `Bearer ${token.accessToken}`,
                    },
                }
            );
            const data = response.data;
            setOrderStatus(data.data.status);

            // Nếu trạng thái là PAID, dừng polling
            if (data.data.status === "PAID") {
                clearInterval(orderCheckInterval);

                // Hiển thị Swal thông báo và đếm ngược
                Swal.fire({
                    icon: "success",
                    title: "Thanh toán thành công!",
                    html: "Quay lại trang tạo hóa đơn sau <b>3</b> giây...",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        let countdown = 3;
                        const timerInterval = setInterval(() => {
                            b.textContent = countdown--;
                        }, 1000);
                        setTimeout(() => clearInterval(timerInterval), 3000);
                    },
                }).then(() => {
                    navigate("/create_invoicet");
                });
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra trạng thái:", error);
        }
    };

    // Hàm huỷ QR
    const cancelQRCode = async (orderCode) => {
        setIsQRCodeCancelled(true);
        setQrText("");
        setOrderCode("");
        setOrderStatus("CANCEL");

        clearInterval(orderCheckInterval);

        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(
                `http://localhost:8000/v1/app/payment/cancel-order`,
                {
                    orderID: orderCode,
                },
                {
                    headers: {
                        token: `Bearer ${token.accessToken}`,
                    },
                }
            );
            if (response.data.code === "00") {
                Swal.fire({
                    icon: "warning",
                    title: "Đã hủy mã QRCode",
                    text: "Bạn có thể chọn phương thức thanh toán khác.",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Lỗi khi huỷ đơn hàng:", error);
        }
    };

    // Bắt đầu kiểm tra trạng thái mỗi giây
    const startCheckingOrderStatus = (orderID) => {
        const interval = setInterval(() => {
            checkOrderStatus(orderID);
        }, 1000);
        setOrderCheckInterval(interval);
    };

    // Xóa interval khi component bị hủy
    useEffect(() => {
        return () => {
            if (orderCheckInterval) {
                clearInterval(orderCheckInterval);
            }
        };
    }, [orderCheckInterval]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        if (method === "banking") {
            fetchAPIQRCode(total);
        } else if (method === "cash") {
            navigate("/invoice_preview/cash", {
                state: { items, total, paymentMethod: "cash" },
            });
        }
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
                                <td className="border px-4 py-2">
                                    {item.product}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.quantity}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.price}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.total}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-4 text-lg">
                    <strong>Tổng Tiền: {total} VND</strong>
                </div>

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

                {paymentMethod === "banking" && qrText && (
                    <>
                        <div className="flex justify-center mt-6">
                            <QRCode value={qrText} />
                        </div>
                        <p className="text-center mt-4">
                            Quét mã QR bằng ứng dụng ngân hàng để thanh toán.
                        </p>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => cancelQRCode(orderCode)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Hủy QRCode
                            </button>
                        </div>
                    </>
                )}

                <div className="text-center mt-4">
                    <p>
                        Trạng thái đơn hàng:{" "}
                        <strong>
                            {orderStatus === "PENDING"
                                ? "Chưa thanh toán"
                                : orderStatus === "PAID"
                                ? "Đã thanh toán"
                                : orderStatus === "CANCEL"
                                ? "Đã hủy"
                                : "Không xác định"}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InvoicePreview;
