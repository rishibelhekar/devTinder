const validator = require("validator")

const validateSignUpdate = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!")
    }
    else if (!validator.isEmail(email)) {
        throw new Error("please enter valid email id")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password")
    }
}

const checkEditData = (req) => {
    const allowedEditFileds = ["firstName", "lastName", "email", "mobile", "gender", "age", "photURL"]
    const isEditAllow = Object.keys(req.body).every(field => allowedEditFileds.includes(field))
    console.log(isEditAllow)
    return isEditAllow;
}


module.exports = {
    validateSignUpdate, checkEditData
}