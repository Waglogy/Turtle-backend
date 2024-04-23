const asyncErrorHandler = require("../utils/asyncErrorHandler")
const contactModel = require("../models/contact.model")

const getContacts = asyncErrorHandler(async (req, res) => {
    const data = await contactModel.find({})
    res.render("contact", { data })
})

const deleteContact = asyncErrorHandler(async (req, res) => {
    const { id } = req.params
    const deleteContact = await contactModel.findByIdAndDelete(id)
    if (deleteContact === null) {
        return res.status(404).send("Contact not found")
    }
    res.status(200).json({ message: "Contact deleted successfully" })
})

module.exports = { getContacts, deleteContact }
