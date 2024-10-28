const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true, // Giá bán là bắt buộc
        },
        purchasePrice: {
            type: Number,
            required: false, // Giá nhập không bắt buộc
        },
    },
    { _id: false } // Không thêm _id
);

const productInfoSchema = new mongoose.Schema(
    {
        // Ngày sản xuất
        mfg: {
            type: Number,
            required: false,
        },

        // Hạn sử dụng
        exp: {
            type: Number,
            required: false,
        },

        //Mô tả
        description: {
            type: String,
            require: false,
        },

        //Mã vạch trên sản phẩm
        barcode: {
            type: String,
            unique: true,
            default: function () {
                return "undefined" + this.parent().productID; // Lấy giá trị của productID
            },
        },
    },
    { _id: false } // Không thêm _id
);

const productSchema = new mongoose.Schema(
    {
        //Mã sản phẩm
        productID: {
            type: String,
            required: true,
            unique: true,
        },

        //Tên sản phẩm
        name: {
            type: String,
            required: true,
            unique: true,
        },

        //Giá
        prices: priceSchema,

        //Thông tin sản phẩm
        productInfo: productInfoSchema,

        //Số lượng còn lại trong kho
        stock: {
            type: Number,
            default: 0,
        },

        // Ngày nhập
        purchaseDate: {
            type: Date,
            default: Date.now,
        },

        //Mức cảnh báo hết hàng
        warnningLevel: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
