const express = require("express")
//database rquire dabase file to import as require 
const connectDB = require("./config/database.js")

const cookieParser = require("cookie-parser")
const app = express()



//express json to make api data read when sending from api body
app.use(express.json())
//cookie parser middleware
app.use(cookieParser())

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")

app.use("/", authRouter)
app.use("/", profileRouter);
app.use("/", requestRouter)


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