const express = require("express")

const profileRouter = express.Router()

//import middleware
const { apiAuth } = require("../middlewares/apiAuth")
const jwt = require("jsonwebtoken")


//get profile call => as we create cookie server will send token in cookie when get profile call
//we have make route so profile will not work as we need to impoert cookie
profileRouter.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies
        const { token } = cookies
        if (!token) {
            throw new Error("Invalid token")
        }
        // jwt verify taken 2 parameter 1. token 2. sign (which we have added in post login api = > jwt sign)
        const verifyToken = await jwt.verify(token, "rishitoken")
        console.log(verifyToken)
        const user = await User.findById(verifyToken._id);
        const profile = user
        console.log(user.email)
        //console.log(user)
        if (!user) {
            throw new Error("User does not exists")
        } else {
            res.send(`"Profile or login user is: ", ${user.email}`)
        }
        //console.log(cookies)
        //res.send("Get Profile data", user)
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})

//same like profile API but middle ware added for same => apiAuth is middleware
profileRouter.get("/profileBy", apiAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)

    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

module.exports = profileRouter;