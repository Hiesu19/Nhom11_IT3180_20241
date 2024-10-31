const express = require("express");
const router = express.Router();

const notificationController = require("../app/controllers/NotificationController");
const middlewareControllers = require("../app/controllers/middlewareController");

router.get("/get_all", notificationController.getAllNotification); //, middlewareControllers.verifyToken


module.exports = router;
