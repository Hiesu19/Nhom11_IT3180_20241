const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserControllers");
const middlewareControllers = require("../app/controllers/middlewareControllers");

router.get("/", middlewareControllers.verifyToken, userController.getAllUsers);
router.delete("/:id",middlewareControllers.verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
