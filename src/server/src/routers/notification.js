const express = require("express");
const router = express.Router();

const notificationController = require("../app/controllers/NotificationController");
const middlewareControllers = require("../app/controllers/middlewareController");

// Lấy thông báo
router.get(
    "/get_all",
    middlewareControllers.verifyToken,
    notificationController.getAllNotification
);

// Tạo thông báo
router.post(
    "/post",
    middlewareControllers.verifyTokenAndQL_Admin,
    notificationController.makeNotification
);

// Hàm thêm seen thông báo
router.post(
    "/seen/:id",
    middlewareControllers.verifyToken,
    notificationController.seenNotification
);

module.exports = router;
