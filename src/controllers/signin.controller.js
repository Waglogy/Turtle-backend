const asyncErrorHandler = require("../utils/asyncErrorHandler")

const signinHandler = asyncErrorHandler(async (req, res) => {
    res.render("pages/login")
})

module.exports = {
    signinHandler,
}
