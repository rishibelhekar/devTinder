const express = require("express")
//database rquire dabase file to import as require 
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const app = express()

//express json to make api data read when sending from api body
app.use(express.json())


//create API for user
app.post("/signup", async (req, res) => {

    //dynamic user data from API
    const user = new User(req.body)

    try {
        await user.save();
        res.send("User Added Succesfully!!")
    }
    catch (err) {
        res.status(400).send("error saving the user: " + err.message)
    }

})

//find user by email Id:
app.get("/user", async (req, res) => {
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
app.get("/feed", async (req, res) => {
    try {
        const feed = await User.find({})
        res.send(feed)

    } catch (err) {
        res.status(401).send("something went wrong")
    }
})

//create API findOne record => findone return null if no record
app.get("/findone", async (req, res) => {
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
app.delete("/user", async (req, res) => {
    const userId = req.body.userId

    try {
        const deleteUser = User.findByIdAndDelete(userId)
        res.send("User Deleted Succesfullly")

    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

//update API by PATCH => update user

app.patch("/user", async (req, res) => {
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

connectDB().then(() => {
    console.log("Database Connection Created with mongo");
    // Start server 
    app.listen(3000, () => {
        console.log("server started...")
    })
}).catch((err) => {
    console.error(err)
    console.log("Databse can't Connect")
})