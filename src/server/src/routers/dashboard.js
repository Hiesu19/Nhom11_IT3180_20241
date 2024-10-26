const express = require("express");
const router = express.Router();

const dashboardController = require("../app/controllers/DashboardController");
const middlewareControllers = require("../app/controllers/middlewareController");

router.get("/", dashboardController.getDashboard); //, middlewareControllers.verifyToken


module.exports = router;
