const {
  getContacts,
  deleteContact,
} = require("../controllers/contact.controller");

const contactRoutes = require("express").Router();

contactRoutes.route("/").get(getContacts);

contactRoutes.route("/:id").delete(deleteContact);

module.exports = { contactRoutes };
