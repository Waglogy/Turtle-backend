const asyncErrorHandler = require("../utils/asyncErrorHandler")
const contactModel = require("../models/contact.model")
const { TableBookingModel } = require("../models/table_booking.model")

const dashboardController = asyncErrorHandler(async (req, res) => {
    const contact = await contactModel.aggregate([
        {
            $count: "contacts",
        },
    ])

    const bookings = await TableBookingModel.aggregate([
        {
            $count: "bookings",
        },
    ])

    res.render("index", {
        contact: contact[0]?.contacts == null ? 0 : contact[0]?.contacts,
        bookings: bookings[0]?.bookings == null ? 0 : bookings[0]?.bookings,
    })
})

module.exports = { dashboardController }
