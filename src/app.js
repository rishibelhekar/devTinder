const express = require("express")
//database rquire dabase file to import as require 
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const app = express()

//create API for user
app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Nitesh",
        lastName: "Belhekar",
        email: "nitesh@gmail.com",
        mobile: "9090909191",
        gender: "male",
        age: "30"
    })

    await user.save();
    res.send("User Added Succesfully!!")
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