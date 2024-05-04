const { bookTable, deleteBookings } = require("../controllers/table.controller")
const isLoggedIn = require("../middleware/isLoggedIn.middleware")

const tableRoutes = require("express").Router()

// Add new bookings.
tableRoutes.route("/add").post(bookTable)

tableRoutes.route("/delete").delete(isLoggedIn, deleteBookings)

module.exports = {
    tableRoutes,
}
