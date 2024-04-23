require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const passport = require("passport")
const { mainRoutes } = require("./routes/main.routes")
const expressSessions = require("express-session")

require("./strategy/local.strategy")

const app = express()

app.use(
    expressSessions({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 10,
            httpOnly: true,
            // secure: true,
        },
    })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "./views"))
app.use("/", mainRoutes)

app.all("*", (req, res) => {
    res.status(404).render("pages/404")
})

app.use((err, req, res, next) => {
    res.status(500).json("Internal Server Error" + err.message)
})

module.exports = { app }
