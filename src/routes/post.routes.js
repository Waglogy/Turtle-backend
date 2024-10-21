const multer = require("../config/multer.config")
const {
    addPost,
    renderPost,
    deletePost,
    getPosts,
} = require("../controllers/post.controller")
const isLoggedIn = require("../middleware/isLoggedIn.middleware")

const postRoute = require("express").Router()

postRoute.route("/").get(isLoggedIn, renderPost)

postRoute.route("/").post(isLoggedIn, multer.single("image"), addPost)

postRoute.route("/all").get(getPosts)

postRoute.route("/delete").delete(isLoggedIn, deletePost)

module.exports = { postRoute }
