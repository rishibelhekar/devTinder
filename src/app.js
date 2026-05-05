const express = require("express")

const app = express()

app.use("/test", (req, res) => {
    res.send("Hello Word test page")
})

app.use("/hello", (req, res) => {
    res.send("this is hello page route")
})

app.listen(3000, () => {
    console.log("server started...")
})

app.use("/check", (req, res) => {
    res.send("check page view")
})

app.use("/", (req, res) => {
    res.send("Dashboard page")
})