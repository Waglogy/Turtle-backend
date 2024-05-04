const mainRoutes = require("express").Router()
const { dashboardRoutes } = require("./dashboard.routes")
const { contactRoutes } = require("./contact.routes")
const { signinRoutes } = require("./signin.routes")
const checkAuth = require("../middleware/checkAuth.middleware")
const isLoggedIn = require("../middleware/isLoggedIn.middleware")
const { blogRoute } = require("./blog.routes")
const { BlogModel } = require("../models/blog.model")
const { tableRoutes } = require("./table_booking.routes")

mainRoutes.use("/auth", checkAuth, signinRoutes)

mainRoutes.use("/contact", contactRoutes)

mainRoutes.use("/blog", blogRoute)

mainRoutes.use("/book-table", tableRoutes)

mainRoutes.route("/posts").get(async (req, res) => {
    const blogs = await BlogModel.find()
    res.render("posts", { data: blogs })
})

mainRoutes.use("/", isLoggedIn, dashboardRoutes)

mainRoutes.route("/logout").get((req, res) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect("/")
    })
})

module.exports = { mainRoutes }
