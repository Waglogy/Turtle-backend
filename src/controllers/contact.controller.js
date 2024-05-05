const asyncErrorHandler = require("../utils/asyncErrorHandler")
const contactModel = require("../models/contact.model")

const getContacts = asyncErrorHandler(async (req, res) => {
    const data = await contactModel.find({})
    res.render("contact", { data })
})

const createContact = asyncErrorHandler(async (req, res) => {
    const { name, email, subject, message } = req.body

    const captcha = req.body["g-recaptcha-response"]

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

    if (!name || !email || !subject || !message)
        return res.status(400).json({
            status: false,
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
        })

    await contactModel.create({
        name,
        email,
        subject,
        message,
    })

    res.status(201).json({
        status: true,
        message:
            "Your message has been successfully sent. We'll be in touch with you shortly. Thank you for contacting us!",
    })
})

const deleteContact = asyncErrorHandler(async (req, res) => {
    const { id } = req.params
    const deleteContact = await contactModel.findByIdAndDelete(id)
    if (deleteContact === null) {
        return res.status(404).json({
            status: false,
            message:
                "The contact you are attempting to delete does not exist in your records. It may have already been removed or does not match any existing posts. Please verify details and try again.",
        })
    }
    res.status(200).json({
        status: true,
        message:
            "Contact successfully deleted. Thank you for managing your contacts.",
    })
})

module.exports = { getContacts, deleteContact, createContact }
