const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        upcoming_date: {
            type: Date,
            required: true,
        },

        yt_link: {
            type: String,
        },

        image: {
            type: String,
        },
        imageId: String,

        isFile: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

const PostModel = mongoose.model("blog", postSchema)

module.exports = { PostModel }
