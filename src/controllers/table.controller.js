const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { TableBookingModel } = require("../models/table_booking.model")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")

const bookTable = asyncErrorHandler(async (req, res) => {
    const { name, phone, number_of_people, special_request, date } = req.body

    /* const captcha = req.body["g-recaptcha-response"]

    const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET,
        response: captcha,
        remoteip: req.ip,
    })

    const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            body: params,
        }
    )

    const captchaData = await response.json()

    if (!captchaData.success)
        return res.status(400).json({
            status: false,
            message:
                "The CAPTCHA verification failed. Please try again to ensure that you are not a robot.",
        })
 */
    if (!name || !phone || !number_of_people || !special_request || !date)
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
            success: false,
        })

    await TableBookingModel.create({
        name,
        phone,
        number_of_people,
        special_request,
        date,
    })

    res.status(StatusCodes.CREATED).json({
        message:
            "Your table has been successfully booked. We look forward to welcoming you!",
        success: true,
    })
})

const getBookings = asyncErrorHandler(async (req, res) => {
    const bookings = await TableBookingModel.find()

    res.render("bookings", {
        data: bookings,
    })
})

const deleteBookings = asyncErrorHandler(async (req, res) => {
    const { id } = req.query

    if (!id || !mongoose.isValidObjectId(id))
        return res.status(400).json({
            success: false,
            message:
                "Please provide a valid booking ID to proceed with the deletion. Thank you.",
        })

    const deleteBooking = await TableBookingModel.findByIdAndDelete(id)

    if (deleteBooking === null || deleteBooking.length < 0)
        return res.status(404).json({
            success: false,
            message:
                "The booking you are attempting to delete does not exist in your records. It may have already been removed or does not match any existing posts. Please verify the booking details and try again.",
        })

    res.status(200).json({
        success: true,
        message:
            "Booking successfully deleted. It has been removed from the system. Thank you for managing your bookings.",
    })
})

module.exports = { bookTable, getBookings, deleteBookings }
