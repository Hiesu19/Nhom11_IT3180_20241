const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const notificationSchema = new mongoose.Schema(
    {
        // Mã thông báo
        notificationID: {
            type: Number,
            unique: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
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

        // Ai đã xem
        seenBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Gửi tới ai
        sendTo: {
            type: [mongoose.Schema.Types.Mixed], // Hỗ trợ ObjectId và string
            default: function () {
                return ["all"];
            },
        },
    },
    { timestamps: true }
);

notificationSchema.plugin(AutoIncrement, { inc_field: "notificationID" }); // NotificationId tự động tăng 1

module.exports = mongoose.model("Notification", notificationSchema);
