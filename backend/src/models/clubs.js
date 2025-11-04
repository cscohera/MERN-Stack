
const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  description: String,
});

const clubs = mongoose.model("clubs", clubSchema);

module.exports = clubs;