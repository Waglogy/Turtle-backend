const dashboardRoutes = require("express").Router();
const { dashboardController } = require("../controllers/dashboard.controller");

dashboardRoutes.route("/").get(dashboardController);

module.exports = { dashboardRoutes };
