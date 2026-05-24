//user Routes

const express = require("express")
//apiAUth Import
const { apiAuth } = require("../middlewares/apiAuth")
//import connectionrequest
const ConnectionRequest = require("../models/connectionRequest")
const userRouter = express.Router()

//get all user request
userRouter.get("/user/request/received", apiAuth, async (req, res) => {
    try {
        const loginUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            fromUserId: loginUser._id,
            status: "interested" // will fecth only request which status is interesetd
        }).populate("fromUserId", "firstName lastName")

        res.json({
            message: "Date fecth Successfully",
            data: connectionRequest,
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

//export router
module.exports = userRouter;