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

app.get("/about", (req, res) => {
    res.send("get data from about")
})

app.post("/about", (req, res) => {
    res.send("Post data on about")
})

app.delete("/about", (req, res) => {
    res.send("delete data on about")
})

app.use("/", (req, res) => {
    res.send("Dashboard page")
})

