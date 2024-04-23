const mongoose = require("mongoose")

const tableBookingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        number_of_people: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

const TableBookingModel = mongoose.model("table_booking", tableBookingSchema)

module.exports = { TableBookingModel }
