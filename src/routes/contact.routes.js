const {
    getContacts,
    deleteContact,
    createContact,
} = require("../controllers/contact.controller")

const isLoggedIn = require("../middleware/isLoggedIn.middleware")

const contactRoutes = require("express").Router()

contactRoutes.route("/").get(isLoggedIn, getContacts)

contactRoutes.route("/").post(createContact)

contactRoutes.route("/:id").delete(isLoggedIn, deleteContact)

module.exports = { contactRoutes }
