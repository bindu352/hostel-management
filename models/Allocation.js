const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({

    studentName: String,

    roomNumber: String,

    allocationDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "Allocated"
    },

    remarks: String

});

module.exports = mongoose.model("Allocation", allocationSchema);