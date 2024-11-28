const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const promotionSchema = new mongoose.Schema(
    {
        // Mã khuyến mãi (dạng KM_00001)
        promotionID: {
            type: String,
            unique: true,
        },

        // Tác giả
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // Tiêu đề
        title: {
            type: String,
            required: true,
        },

        // Mô tả
        description: {
            type: String,
            required: false,
        },

        // Giảm giá
        discount: {
            type: String,
            required: true,
        },

        // Danh sách sản phẩm áp dụng
        appliedProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],

        // Thời gian bắt đầu
        startTime: {
            type: Date,
            required: true,
        },

        // Thời gian kết thúc
        endTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

promotionSchema.plugin(AutoIncrement, { inc_field: "tempPromotionID" });

promotionSchema.pre("save", async function (next) {
    if (!this.promotionID) {
        const counter = await mongoose.model("Promotion").countDocuments();
        const newID = counter + 1; // Tăng số đếm
        this.promotionID = `KM_${newID.toString().padStart(5, "0")}`;
    }
    next();
});

module.exports = mongoose.model("Promotion", promotionSchema);
