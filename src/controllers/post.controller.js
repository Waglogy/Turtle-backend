const { PostModel } = require("../models/post.model")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { imageUploader, imageRemover } = require("../utils/imageHandler")
const mongoose = require("mongoose")
const { StatusCodes } = require("http-status-codes")

const addPost = asyncErrorHandler(async (req, res) => {
    const { title, content, upcoming_date, ytlink, media } = req.body

    if (!title || !content || !upcoming_date || !media) {
        return res.status(400).json({
            success: false,
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
        })
    }

    if (media === "type-link") {
        if (!ytlink)
            return res.status(400).json({
                success: false,
                message:
                    "Please provide a valid YouTube link before submitting the form. Thank you.",
            })

        await PostModel.create({
            title,
            content,
            upcoming_date,
            yt_link: ytlink,
            isFile: false,
        })

        res.status(201).json({
            success: true,
            message: "Post with YouTube link added successfully!",
        })
    }

    if (media === "type-file") {
        // Assuming file upload middleware is used (e.g., multer), and the file is available in `req.file`
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:
                    "Please upload an image file before submitting the form. Thank you.",
            })
        }

        // Get the uploaded image file's path
        const imageUrl = await imageUploader(req.file.path, "posts") // This depends on how you configure your file storage

        // Store the post with the image
        const post = await PostModel.create({
            title,
            content,
            upcoming_date,
            image: imageUrl.secure_url,
            imageId: imageUrl.public_id,
            isFile: true,
        })

        return res.status(201).json({
            success: true,
            message: "Post with image added successfully!",
            post,
        })
    }
})

/*  if (!title || !content || !upcoming_date || !req.files)
        return res.status(400).json({
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
            status: false,
        })

    const imageUrl = []
    const imageId = []

    for (const file of req.files) {
        const image = await imageUploader(file.path, "posts")
        imageUrl.push(image.secure_url)
        imageId.push(image.public_id)
    }

    await PostModel.create({
        title,
        content,
        upcoming_date,
        image: imageUrl,
        imageId: imageId,
    }) */

//     res.redirect("/posts")
// })

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
            message:
                "Please provide a valid post ID to proceed with the deletion. Thank you.",
            status: false,
        })
    }

    const result = await PostModel.findByIdAndDelete(id)

    if (result === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message:
                "The post you are attempting to delete does not exist in the records. It may have already been removed or does not match any existing posts. Please verify the post details and try again.",
            status: false,
        })
    }

    await imageRemover(result.imageId)

    res.status(StatusCodes.OK).json({
        message:
            "Post successfully deleted. It has been removed from system. Thank you for managing your posts.",
        status: true,
    })
})

module.exports = {
    addPost,
    renderPost,
    getPosts,
    deletePost,
}
