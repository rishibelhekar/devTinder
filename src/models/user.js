const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gneder data not Valid")
            }
        },
    },
    age: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)