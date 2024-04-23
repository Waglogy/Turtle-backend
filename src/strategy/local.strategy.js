const LocalStrategy = require("passport-local").Strategy
const passport = require("passport")
const { adminModel } = require("../models/admin.model")

passport.use(
    new LocalStrategy(async function (username, password, done) {
        const admin = await adminModel.findOne({ username: username })
        if (!admin) {
            return done(null, false)
        }
        if (password != admin.password) {
            return done(null, false)
        }
        return done(null, admin)
    })
)

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})
