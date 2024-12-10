import axios from "axios";

const makeNotificationToAll = async (title, body, type) => {
    try {
        const token = JSON.parse(localStorage.getItem("user"));
        if (!token) {
            throw new Error("Token không có trong localStorage");
        }
        const config = {
            headers: {
                token: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
            },
        };

        const data = {
            title: title,
            body: body,
            type: type,
        };

        // Gửi POST request đến API
        const response = await axios.post(
            `http://localhost:8000/v1/app/notification/post`,
            data,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Đã xảy ra lỗi khi tạo thông báo");
        }
    } catch (error) {
        console.error("Lỗi khi gửi thông báo:", error);
        throw error;
    }
};

export default makeNotificationToAll;
