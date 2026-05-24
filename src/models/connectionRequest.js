const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true
    }
);


//below fun is like middleware it will call vevery time before connection resquest is save
// we are calling  connectionRequest.save(); in Request API so befoe that below pre save will call
// connectionRequestSchema.pre("save", function (next) {
//     const connectionRequest = this

//     if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//         throw new Error("You cant send request to your self")
//     }
//     next()
// })

//check if fromUserID is same as touserID
//below we can add in API as well to check validation self but we can add in pre a standard way of code
connectionRequestSchema.pre("save", async function () {

    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("You cant send request to yourself");
    }

});

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel;