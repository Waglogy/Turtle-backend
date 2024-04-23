const { bookTable, getBookings } = require("../controllers/table.controller")

const tableRoutes = require("express").Router()

// Add new bookings.
tableRoutes.route("/add").post(bookTable)

// Get all bookings

tableRoutes.route("/").get(getBookings)

module.exports = {
    tableRoutes,
}
