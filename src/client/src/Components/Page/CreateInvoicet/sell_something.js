import axios from "axios";

const sellSomething = async (items) => {
    try {
        const sellData = {
            items: items.map((item) => ({
                productID: item.productID,
                quantity: item.quantity,
            })),
        };
        console.log(sellData);

        // Gửi yêu cầu lưu hóa đơn qua API
        const token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
            "http://localhost:8000/v1/app/products/sell",
            sellData,
            {
                headers: {
                    token: `Bearer ${token.accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Lỗi khi giảm sản phẩm:", error);
        throw error;
    }
};

export default sellSomething;
