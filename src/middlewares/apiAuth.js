const jwt = require("jsonwebtoken")
const User = require("../models/user")

const apiAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("Token is not Valid!")
        }
        // jwt verify taken 2 parameter 1. token 2. sign (which we have added in post login api = > jwt sign)
        const validToken = await jwt.verify(token, "rishitoken")
        //will get Id in validtoken as we verify token
        const { _id } = validToken

        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User is not found")
        }
        // here in below we are sending user in req => so we can fecth in API
        req.user = user
        next()
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
    next()
}

module.exports = {
    apiAuth
}