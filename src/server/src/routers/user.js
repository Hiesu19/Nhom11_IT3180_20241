const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const middlewareControllers = require("../app/controllers/middlewareController");

//Lấy thông tin toàn bộ nhân viên
router.get(
    "/",
    middlewareControllers.verifyTokenAndAdmin,
    userController.getAllUsers
);

//Xoá nhân viên
router.delete(
    "/:id",
    middlewareControllers.verifyTokenAndAdmin,
    userController.deleteUser
);

module.exports = router;
