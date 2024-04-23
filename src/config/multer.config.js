const multer = require("multer")
const path = require("path")
const { StatusCodes, getReasonPhrase } = require("http-status-codes")
const ApiError = require("../utils/ApiError")

module.exports = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
            cb(
                new ApiError(
                    StatusCodes.UNSUPPORTED_MEDIA_TYPE,
                    getReasonPhrase(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
                ),
                false
            )
            return
        }
        cb(null, true)
    },
})
