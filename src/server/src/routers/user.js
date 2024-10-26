const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const middlewareControllers = require("../app/controllers/middlewareController");

router.get("/", userController.getAllUsers); //, middlewareControllers.verifyToken
router.delete(
    "/:id",
    userController.deleteUser
);

module.exports = router;
