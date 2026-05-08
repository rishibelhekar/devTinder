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
    //create new instance
    // const user = new User({
    //     firstName: "sachin",
    //     lastName: "tendulkar",
    //     email: "sachin@gmail.com",
    //     mobile: "9090909191",
    //     gender: "male",
    //     age: "50"
    // })

    try {
        await user.save();
        res.send("User Added Succesfully!!")
    }
    catch (err) {
        res.status(400).send("error saving the user", + err.message)
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