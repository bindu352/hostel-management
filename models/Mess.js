const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
    day: String,
    breakfast: String,
    lunch: String,
    dinner: String
});

module.exports = mongoose.model("Mess", messSchema);