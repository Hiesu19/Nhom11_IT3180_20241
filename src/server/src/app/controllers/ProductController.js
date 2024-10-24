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
}

module.exports = new ProductController();
