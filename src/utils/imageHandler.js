const cloudinary = require("cloudinary").v2
const AppError = require("./ApiError")
const { StatusCodes } = require("http-status-codes")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const imageUploader = async (...image_details) => {
    try {
        const [image_path, folder] = image_details
        const result = await cloudinary.uploader.upload(image_path, {
            folder: `${process.env.CLOUDINARY_FOLDER_NAME}/${folder}`,
        })
        return result
    } catch (error) {
        throw new AppError(StatusCodes.NOT_FOUND, error.message)
    }
}

const imageRemover = async (imageId) => {
    try {
        const result = await cloudinary.api.delete_resources(imageId, {
            type: "upload",
            resource_type: "image",
        })
        return result
    } catch (error) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "Image Not Found. Please try again."
        )
    }
}

module.exports = {
    imageUploader,
    imageRemover,
}
