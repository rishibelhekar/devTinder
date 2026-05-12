const express = require("express")
//database rquire dabase file to import as require 
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const { validateSignUpdate } = require("./utils/validation.js")
const bcrypt = require("bcrypt")
const app = express()

//express json to make api data read when sending from api body
app.use(express.json())


//create API for user
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
        console.log(isValidPassword)
        if (isValidPassword) {
            res.send("Login Successfull")
        } else {
            throw new Error("Invaild Password")
        }

    } catch (err) {
        res.status(400).send("EROOR: " + err.message)
    }
})

//same login api just to checck from my end
app.post("/logincheck", async (req, res) => {
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
app.post("/loginby", async (req, res) => {
    try {
        const { email, password } = req.body
        //check email id is avaiable => find email
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            throw new Error("Email id not correct")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log("passwordMatch")
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