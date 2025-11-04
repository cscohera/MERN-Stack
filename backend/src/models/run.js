const mongoose = require("mongoose")

//required fields needed to create a run
const runSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    distance:{
        type:String,
        required: true,
    }, 
    pace:{
        type:String,
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
},
 {timestamps: true} //created at, updatedAt
);

const run = mongoose.model("Run", runSchema);

module.exports = run;