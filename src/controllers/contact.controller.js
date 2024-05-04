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
            message: "Captcha Verification Failed. Please try again.",
        })

    if (!name || !email || !subject || !message)
        return res.status(400).json({
            status: false,
            message: "Fill all the required fields",
        })

    await contactModel.create({
        name,
        email,
        subject,
        message,
    })

    res.status(201).json({
        status: true,
        message: "Your response was recorded successfully.",
    })
})

const deleteContact = asyncErrorHandler(async (req, res) => {
    const { id } = req.params
    const deleteContact = await contactModel.findByIdAndDelete(id)
    if (deleteContact === null) {
        return res.status(404).send("Contact not found")
    }
    res.status(200).json({ message: "Contact deleted successfully" })
})

module.exports = { getContacts, deleteContact, createContact }
