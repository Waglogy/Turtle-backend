const asyncErrorHandler = require("../utils/asyncErrorHandler")
const contactModel = require("../models/contact.model")

const dashboardController = asyncErrorHandler(async (req, res) => {
    const contact = await contactModel.aggregate([
        {
            $count: "contacts",
        },
    ])
    res.render("index", {
        contact: contact[0]?.contacts == null ? 0 : contact[0]?.contacts,
    })
})

module.exports = { dashboardController }
