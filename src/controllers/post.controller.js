const { PostModel } = require("../models/post.model")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { imageUploader, imageRemover } = require("../utils/imageHandler")
const mongoose = require("mongoose")
const { StatusCodes } = require("http-status-codes")

const addPost = asyncErrorHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content || !req.files)
        return res.status(400).json({
            message: "Please fill all fields",
            status: false,
        })

    const imageUrl = []
    const imageId = []

    for (const file of req.files) {
        const image = await imageUploader(file.path, "blog")
        imageUrl.push(image.secure_url)
        imageId.push(image.public_id)
    }

    await PostModel.create({
        title,
        content,
        image: imageUrl,
        imageId: imageId,
    })

    res.redirect("/posts")
})

const renderPost = asyncErrorHandler(async (req, res) => {
    res.render("addpost", {
        data: null,
    })
})

const getPosts = asyncErrorHandler(async (req, res) => {
    const posts = await PostModel.find()

    if (!posts.length)
        return res.status(404).json({
            message: "No posts found",
            status: false,
        })

    res.status(200).json({
        message: "Posts fetched successfully",
        status: true,
        data: posts,
    })
})

const deletePost = asyncErrorHandler(async (req, res) => {
    const { id } = req.query
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide the valid post id",
            status: false,
        })
    }

    const result = await PostModel.findByIdAndDelete(id)

    if (result === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Post not found",
            status: false,
        })
    }

    await imageRemover(result.imageId)

    res.status(StatusCodes.OK).json({
        message: "Post deleted successfully",
        status: true,
    })
})

module.exports = {
    addPost,
    renderPost,
    getPosts,
    deletePost,
}
