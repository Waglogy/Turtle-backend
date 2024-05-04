const { bookTable, deleteBookings } = require("../controllers/table.controller")

const tableRoutes = require("express").Router()

// Add new bookings.
tableRoutes.route("/add").post(bookTable)

tableRoutes.route("/delete").delete(deleteBookings)

module.exports = {
    tableRoutes,
}
