const express = require("express");
const router = express.Router();

const productController = require("../app/controllers/ProductController");
const middlewareControllers = require("../app/controllers/middlewareController");

router.get("/", productController.getAllProducts);
router.post("/add_product", productController.addProduct);

module.exports = router;
