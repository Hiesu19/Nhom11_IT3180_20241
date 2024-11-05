const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");

// Đăng ký
router.post("/register", authController.registerUser);

// Đăng nhập
router.post("/login", authController.loginUser);

module.exports = router;
