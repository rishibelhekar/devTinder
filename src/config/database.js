const mongoose = require("mongoose")

const connectDB = async () => {
    //await mongoose.connect("mongodb+srv://rishi-node-js:jEm54gqWXrGnEaZ8@rishinodejs.qctoagl.mongodb.net/?appName=RishiNodeJS")
    //await mongoose.connect("mongodb+srv://rishi-node-js:jEm54gqWXrGnEaZ8@rishinodejs.qctoagl.mongodb.net/")
    await mongoose.connect("mongodb://rishi-node-js:jEm54gqWXrGnEaZ8@ac-p9zstxz-shard-00-00.qctoagl.mongodb.net:27017,ac-p9zstxz-shard-00-01.qctoagl.mongodb.net:27017,ac-p9zstxz-shard-00-02.qctoagl.mongodb.net:27017/?ssl=true&replicaSet=atlas-en28ew-shard-0&authSource=admin&appName=RishiNodeJS/devTinder")
}

module.exports = connectDB;