const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());

//look at jwt

//mongo connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res) =>{
    res.send("Hello world!");
});

app.get("/other", (req, res) => {
    res.send("Hello, again!");
});

app.listen(PORT,() =>{
console.log("Now listening on port" + PORT);
});