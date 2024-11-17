const Product = require("../models/Product");

class ProductController {
    //GET get all products
    getAllProducts = async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    //GET product by id
    getProductsByID = async (req, res) => {
        try {
            const products = await Product.findById(req.params.id);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    //POST post product
    addProduct = async (req, res) => {
        try {
            //Create new product
            const newProduct = await new Product({
                productID: req.body.productID,
                name: req.body.name,
                prices: {
                    price: req.body.prices.price,
                    purchasePrice: req.body.prices.purchasePrice,
                },
                productInfo: {
                    mfg: req.body.productInfo.mfg,
                    exp: req.body.productInfo.exp,
                    description: req.body.productInfo.description,
                    bracode: req.body.productInfo.bracode,
                },
                stock: req.body.stock,
                warnningLevel: req.body.warnningLevel,
            });

            //Save Database
            const product = await newProduct.save();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    searchProductByNameOrID = async (req, res) => {
        try {
            const data = req.body.data;
            const data1 = await Product.find({
                productID: { $regex: data, $options: "i" },
            }).limit(5); // Chỉ trả về 5 ptu

            // console.log(data1);

            if (data1.length == 0) {
                const data2 = await Product.find({
                    name: { $regex: data, $options: "i" },
                }).limit(5); // Chỉ trả về 5 ptu
                // console.log(data1);
                return res.status(200).json(data2);
            }
            return res.status(200).json(data1);
        } catch (error) {
            return res.status(500).json(error);
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("DELETE successfully !");
        } catch (error) {
            res.status(500).json(error);
        }
    };

    updateProduct = async (req, res) => {
        try {
            // Tìm và cập nhật khóa học
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true } // Trả về tài liệu đã được cập nhật
            );

            // Kiểm tra xem có khóa học nào được tìm thấy hay không
            if (!updatedProduct) {
                return res
                    .status(404)
                    .json({ message: "sản phẩm không tìm thấy" });
            }
            return res.status(200).json("UPDATE successfully !");
        } catch (error) {
            return res.status(500).json(error);
        }
    };

    sellProduct = async (req, res) => {
        try {
            const { items } = req.body; // Lấy thông tin sản phẩm từ request body

            var check_bill = true;

            // Lặp qua từng sản phẩm trong đơn bán
            for (let item of items) {
                const product = await Product.findOne({
                    productID: item.productID,
                });

                if (!product) {
                    check_bill = false;
                    return res.status(400).json({
                        message: `ProductID ${item.productID} not found`,
                    });
                }

                if (product.stock < item.quantity) {
                    check_bill = false;
                    return res.status(400).json({
                        message: `Not enough stock for ${item.product}`,
                    });
                }
            }

            if (check_bill) {
                for (let item of items) {
                    const product = await Product.findOne({
                        productID: item.productID,
                    });

                    // Trừ số lượng sản phẩm trong kho
                    product.stock -= item.quantity;

                    // Cập nhật lại thông tin sản phẩm trong cơ sở dữ liệu
                    await product.save();
                }
                return res.status(200).json({ status: "ok" });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    };
}

module.exports = new ProductController();
