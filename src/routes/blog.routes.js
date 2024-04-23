const multer = require("../config/multer.config")
const {
    renderBlog,
    postBlog,
    getBlogs,
    deletePost,
} = require("../controllers/blog.controller")
const isLoggedIn = require("../middleware/isLoggedIn.middleware")

const blogRoute = require("express").Router()

blogRoute.route("/").get(isLoggedIn, renderBlog)

blogRoute.route("/").post(isLoggedIn, multer.array("image"), postBlog)

blogRoute.route("/all").get(getBlogs)

blogRoute.route("/delete").delete(isLoggedIn, deletePost)

module.exports = { blogRoute }
