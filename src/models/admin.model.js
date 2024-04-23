const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
})
/* 
adminSchema.pre("save", async function (next) {
    if (!this.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

adminSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
 */
const adminModel = mongoose.model("admin", adminSchema)

module.exports = { adminModel }
