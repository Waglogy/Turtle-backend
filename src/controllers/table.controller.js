const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { TableBookingModel } = require("../models/table_booking.model")
const { StatusCodes } = require("http-status-codes")

const bookTable = asyncErrorHandler(async (req, res) => {
    const { name, phone, number_of_people } = req.body
    if (!name || !phone || !number_of_people)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Please fill in all fields", success: false })

    await TableBookingModel.create({
        name,
        phone,
        number_of_people,
    })

    res.status(StatusCodes.CREATED).json({
        message: "Table booked",
        success: true,
    })
})

const getBookings = asyncErrorHandler(async (req, res) => {
    const bookings = await TableBookingModel.find()

    if (bookings.length === 0 || bookings === null)
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "No bookings found",
            success: false,
        })

    res.status(StatusCodes.OK).json({ data: bookings })
})

module.exports = { bookTable, getBookings }
