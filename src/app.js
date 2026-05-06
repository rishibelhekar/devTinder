const express = require("express")

const app = express()

app.use("/test", (req, res) => {
    res.send("Hello Word test page")
})

app.use("/hello/2", (req, res) => {
    res.send("Nested Route")
})

app.use("/hello", (req, res) => {
    res.send("this is hello page route")
})


// Start server
app.listen(3000, () => {
    console.log("server started...")
})

app.use("/check", (req, res) => {
    res.send("check page view")
})
const { userAuth } = require("./middlewares/userAuth.js")
app.get("/about", userAuth, (req, res) => {
    res.send("get data from about")
})


app.post("/about", userAuth, (req, res) => {
    res.send("Post data on about")
})

app.delete("/about", (req, res) => {
    res.send("delete data on about")
})

//query parameter
app.get("/user", (req, res) => {
    console.log(req.query)
    res.send("USer Get Call")
})

//dyanaic route
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send({ firstName: "Rishi", lastName: "Belhekar" })
})

app.use("/contact", (req, res, next) => {
    console.log("First call")
    next()
},
    (req, res, next) => {
        console.log("Handle second Respnse")
        res.send("Second Response")
        next()
    },
    (req, res, next) => {
        console.log("handle third Response")
        //res.send("third Resonse")
        next()
    },
    (req, res, next) => {
        console.log("3 Handle")
        //.send("3 Handle")
        next()
    },
    (req, res, next) => {
        console.log("4th handle")
        //res.send("4th Handle")
        next()
    }
)

const { adminAuth } = require("../middleware/auth.js")

app.use("/admin", adminAuth)

app.get("/admin/getalldata", (req, res) => {
    res.send("Admin Get all data")
    //res.status(401).send("Unautorized")
})

app.get("/admin/deleteuser", (req, res) => {
    res.send("Admin Delete all data")
})

// app.use("/", (req, res) => {
//     res.send("Dashboard page")
// })

