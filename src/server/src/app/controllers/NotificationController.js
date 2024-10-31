const User = require("../models/User");
const Product = require("../models/Product");
const Notification = require("../models/Notification");

class NotificationController {
    //GET AllNotification
    getAllNotification = async (req, res) => {
        return res.status(200).json("All Notification");
    };
}
module.exports = new NotificationController();
