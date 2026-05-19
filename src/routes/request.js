const express = require("express");
const requestRouter = express.Router()

//import model =>request scheme
const ConnectionRequest = require("../models/connectionRequest")
//import User schema
const User = require("../models/user")
//import middleware
const { apiAuth } = require("../middlewares/apiAuth")

//find user by email Id:
requestRouter.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.find({ email: userEmail })

        // if no datafound
        if (user.length === 0) {
            res.status(400).send("No data found")
        } else {
            res.send(user)
        }

    } catch (err) {
        res.status(400).send("something went wrong")
    }

})

//create API for get all feed/user
requestRouter.get("/feed", async (req, res) => {
    try {
        const feed = await User.find({})
        res.send(feed)

    } catch (err) {
        res.status(401).send("something went wrong")
    }
})

//create API findOne record => findone return null if no record
requestRouter.get("/findone", async (req, res) => {
    const userEmail = req.body.email;
    console.log(userEmail)
    try {
        const findone = await User.findOne({ email: userEmail })
        if (!findone) {
            res.status(400).send("no Record")
        } else {
            res.send(findone)
        }

    }
    catch (err) {
        res.status(400).send("something went wrong")
    }

})

//delete by user id => Delete API delete user by ID
requestRouter.delete("/user", async (req, res) => {
    const userId = req.body.userId

    try {
        const deleteUser = User.findByIdAndDelete(userId)
        res.send("User Deleted Succesfullly")

    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

//update API by PATCH => update user
requestRouter.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after" })
        console.log(updateUser)
        res.send("User updated Successfully")
    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

//send connection Request API
requestRouter.post("/request/send/:status/:toUserId", apiAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        const status = req.params.status;

        //check status in API => user send in url => below we are cheking status validation
        //never trust on user so in url what status is we need to validate

        const isAllowStatus = ["ignored", "interested"];
        if (!isAllowStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status: " + status })
        }

        //check if toUser is available in db or Not
        const toUserCheck = await User.findOne({ toUserId })

        if (!toUserCheck) {
            return res.status(400).json({ message: "User does not Exists!" })
        }

        //existing request validation => below code check req from user and again if aonther user is already send request
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        })
        if (existingRequest) {
            return res.status(400).send({ message: "Request allready Exists!" })
        }


        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status,
        });
        //save data in db
        const data = await connectionRequest.save();

        res.json({
            message: "Connection Request Send Succesfully",
            data,
        })

        //res.send("Request send")
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})


module.exports = requestRouter;