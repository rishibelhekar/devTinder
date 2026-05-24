//user Routes

const express = require("express")
//apiAUth Import
const { apiAuth } = require("../middlewares/apiAuth")
//import connectionrequest
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
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
            message: "Date Fetch Successfully",
            data: connectionRequest,
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

//get all connection received as well as send from user
userRouter.get("/user/connections", apiAuth, async (req, res) => {
    try {
        const loginUser = req.user

        const connectionrequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loginUser._id, status: "accepted" },
                { toUserId: loginUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName")

        const data = connectionrequest.map((row) => {
            if (row.fromUserId._id.toString() === loginUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        })

        res.json({ messaage: "All Coonection fetch", data })

    } catch (err) {
        res.status(400).send("Error ", + err.message)
    }
})

//feed API => all user
//Feed API Login >
//User can see call feed card expect bellow
//1.he cant see his own card 2.his connection 3. who ignored him 4.allready sent req
userRouter.get("/user/feed", apiAuth, async (req, res) => {
    try {
        const loginUser = req.user
        //check req send and rcv for login user
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loginUser._id },
                { toUserId: loginUser._id }
            ]
        }).select("fromUserId toUserId")
        console.log(connectionRequest)

        //user who need to hide 
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString())
        })
        console.log(hideUserFromFeed)

        //find user feed for login user as per checks
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loginUser._id } }
            ]

        }).select("firstName lastName")

        //return user
        res.send(users)

    } catch (err) {
        res.status(400).send("Error " + err.message)
    }
})


//export router
module.exports = userRouter;