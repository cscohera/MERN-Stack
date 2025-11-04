const mongoose = require("mongoose")

//required fields needed to create a user
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    }, 
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        required: true,
    },
    club:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "clubs" },
},
 {timestamps: true} //created at, updatedAt
);

const user = mongoose.model("user", userSchema);

module.exports = user;