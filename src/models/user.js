const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Add firstname")
            }
        }
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address: " + value)
            }
        }
    },
    mobile: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value, 'en-IN')) {
                throw new Error("Mobile number is not valid :" + value)
            }
        }
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
    },
    photoURL: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("URL is not valid: " + value)
            }
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)