import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,

    }
})

const userModel = mongoose.model("crm-Data", userSchema)
export default userModel