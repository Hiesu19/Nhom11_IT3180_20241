const bcrypt = require("bcrypt");
const User = require("../models/User");
const product = require("../models/Product");
const Product = require("../models/Product");

class DashboardController {
    //GET Dashboard
    getDashboard = async (req, res) => {
        const dataOut = {};
        try {
            const products_count = await Product.countDocuments({});
            dataOut.productCount = products_count;
        } catch (error) {
            dataOut.productCount = "Chưa thể xác định";
        }

        try {
            const user_count = await User.countDocuments({});
            dataOut.userCount = user_count;
        } catch (error) {
            dataOut.userCount = "Chưa thể xác định";
        }

        try {
            const result = await Product.aggregate([
                {
                    $project: {
                        totalValue: { $multiply: ["$prices.price", "$stock"] },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalValue: { $sum: "$totalValue" },
                    },
                },
            ]);

            const totalValue = result[0]?.totalValue || 0;
            dataOut.totalValue = totalValue;
        } catch (error) {
            dataOut.totalValue = "Chưa thể xác định";
        }
        return res.status(200).json(dataOut);
    };
}

module.exports = new DashboardController();
