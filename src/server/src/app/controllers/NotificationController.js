const Notification = require("../models/Notification");

class NotificationController {
    //GET AllNotification
    getAllNotification = async (req, res) => {
        try {
            const notifications = await Notification.find();

            // Kiểm tra xem user đã đọc thông báo nào
            const notificationsWithReadStatus = notifications.map(
                (notification) => {
                    const isRead = notification.seenBy.includes(
                        req.user.userid
                    );

                    return {
                        ...notification.toObject(),
                        read: isRead, // Thêm trường `read` vào mỗi thông báo
                    };
                }
            );

            res.status(200).json(notificationsWithReadStatus);
        } catch (error) {
            console.error("Lỗi khi lấy thông báo:", error);
            res.status(500).json({ message: "Lỗi máy chủ khi lấy thông báo" });
        }
    };

    //POST makeNotification
    makeNotification = async (req, res) => {
        try {
            //Create new Notification
            const newNotification = await new Notification({
                author: req.user.id,
                title: req.body.title,
                body: req.body.body,
                type: req.body.type,
            });

            //Save Database
            const noti = await newNotification.save();
            res.status(200).json(noti);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    //POST seen notification
    seenNotification = async (req, res) => {
        try {
            const notificationId = req.params.id;
            const userId = req.user.id; // Lấy userId từ middleware

            // Tìm thông báo theo notificationId
            const notification = await Notification.findById(notificationId);
            if (!notification) {
                return res
                    .status(404)
                    .json({ message: "Notification not found !!!" });
            }

            // Kiểm tra xem userId đã tồn tại trong seenBy chưa
            if (!notification.seenBy.includes(userId)) {
                notification.seenBy.push(userId);
                await notification.save(); // Lưu thông báo đã cập nhật
            }

            res.status(200).json({
                message: "Seen notification",
            });
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
module.exports = new NotificationController();
