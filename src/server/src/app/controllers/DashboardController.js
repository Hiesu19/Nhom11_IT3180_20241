const User = require("../models/User");
const Product = require("../models/Product");

class DashboardController {
    //GET Dashboard
    getDashboard = async (req, res) => {
        const dataOut = {};

        try {
            const [
                productsCount,
                usersCount,
                totalValueResult,
                totalProductsResult,
            ] = await Promise.all([
                Product.countDocuments({}),
                User.countDocuments({}),
                Product.aggregate([
                    {
                        $project: {
                            totalValue: {
                                $multiply: ["$prices.price", "$stock"],
                            },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalValue: { $sum: "$totalValue" },
                        },
                    },
                ]),
                Product.aggregate([
                    {
                        $group: {
                            _id: null,
                            totalProducts: { $sum: "$stock" },
                        },
                    },
                ]),
            ]);

            dataOut.productCount = productsCount;
            dataOut.userCount = usersCount;
            dataOut.totalValue = totalValueResult[0]?.totalValue;
            dataOut.totalProducts = totalProductsResult[0]?.totalProducts;
        } catch (error) {
            dataOut.productCount = dataOut.productCount ?? "Null";
            dataOut.userCount = dataOut.userCount ?? "Null";
            dataOut.totalValue = dataOut.totalValue ?? "Null";
            dataOut.totalProducts =
                dataOut.totalProducts ?? "Null";
        }

        return res.status(200).json(dataOut);
    };
}
module.exports = new DashboardController();
