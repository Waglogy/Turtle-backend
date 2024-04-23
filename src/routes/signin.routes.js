const passport = require("passport")
const { signinHandler } = require("../controllers/signin.controller")

const signinRoutes = require("express").Router()

signinRoutes.route("/").get(signinHandler)

signinRoutes.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/auth" }),
    function (req, res) {
        res.redirect("/")
    }
)

module.exports = { signinRoutes }
