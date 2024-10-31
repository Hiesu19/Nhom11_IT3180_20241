const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        // Title
        title: {
            type: String,
            required: true,
        },

        // Body
        body: {
            type: String,
            required: true,
        },
        // Type of Notification
        type: {
            type: String,
            enum: ["info", "warning", "success", "error"], // Các loại thông báo có thể có
            default: "info",
        },
        seenBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
