const checkAuth = (req, res, next) => {
    if (req.user) {
        // User is already logged in, redirect to another page (e.g., home page)
        return res.redirect("/")
    }
    // User is not logged in, proceed to the next middleware/route
    next()
}

module.exports = checkAuth
