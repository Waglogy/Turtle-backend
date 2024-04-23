const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
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
        image: [],
        imageId: [],
    },
    { timestamps: true }
)

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = { BlogModel }
