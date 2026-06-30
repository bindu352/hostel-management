const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentOccupancy: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Room", roomSchema);