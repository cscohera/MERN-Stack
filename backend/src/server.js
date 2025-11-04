const connectDB  = require("./config/db.js")
const runningRoutes = require ("./routes/runningRoutes.js")
const userRoutes = require ("./routes/userRoutes.js")
const clubRoutes = require ("./routes/clubRoutes.js")
const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8080;

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());

//database connection
connectDB();


//request handling for runs
app.use("/runs", runningRoutes);
app.use("/users", userRoutes);
app.use("/clubs", clubRoutes);


app.listen(PORT,() =>{
console.log("Now listening on port" + PORT);
});