const express = require("express")
const authRouter = express.Router()

const { validateSignUpdate } = require("../utils/validation")
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//create API for user
authRouter.post("/signup", async (req, res) => {
    try {
        //validation of data => using helper function added in utils
        validateSignUpdate(req)

        //object destructring for fields
        const { firstName, lastName, email, password } = req.body
        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)

        //to uppercase
        const firstNameHash = firstName.toUpperCase()
        console.log(firstNameHash)

        //dynamic user data from API
        //const user = new User(req.body)
        //at start we are passing data like above but good way is below
        const user = new User({
            firstName: firstNameHash, lastName, email, password: passwordHash
        })

        await user.save();
        res.send("User Added Succesfully!!")
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }

})

//create login API => email and password
authRouter.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body
        //check email avaialble and correct
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            throw new Error("Invaild Email Id")
        }

        //check password decrypt and check => in compare fn 2 parameter (user password, db password)
        const isValidPassword = await bcrypt.compare(password, user.password)
        // console.log(isValidPassword)
        if (isValidPassword) {
            //create JWT token
            const jwttoken = await jwt.sign({ _id: user._id }, "rishitoken")
            //add token to cookie and send res back to user
            res.cookie("token", jwttoken)
            res.send("Login Successfull")
        } else {
            throw new Error("Invaild Password")
        }

    } catch (err) {
        res.status(400).send("EROOR: " + err.message)
    }
})

//same login api just to checck from my end
authRouter.post("/logincheck", async (req, res) => {
    try {
        const { email, password } = req.body
        //check email id
        const isEmailValid = await User.findOne({ email: email })
        console.log(isEmailValid)
        if (!isEmailValid) {
            throw new Error("Invaid Email")
            console.log("Invalid Email")
        } else {
            console.log("valid Email")
        }
        const passwordValid = await bcrypt.compare(password, isEmailValid.password)
        //check password
        if (passwordValid) {
            res.send("login Successful")
        } else {
            throw new Error("Invalid Password")
        }

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

//new try for login API check email and passwd
authRouter.post("/loginby", async (req, res) => {
    try {
        const { email, password } = req.body
        //check email id is avaiable => find email
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            throw new Error("Email id not correct")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        // console.log("passwordMatch")
        //check password is matched
        if (passwordMatch) {
            res.send("Login correct")
        } else {
            throw new Error("incorrect password")
        }



    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

//logout API
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.send("logout successfully!!")
})

module.exports = authRouter;