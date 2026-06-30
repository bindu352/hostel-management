const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },

    roomNo: {
        type: String,
        required: true
    },

    feeType: {
        type: String,
        enum: [
            "Hostel Fee",
            "Mess Fee",
            "Security Deposit",
            "Maintenance Fee"
        ],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    dueDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Paid",
            "Overdue"
        ],
        default: "Pending"
    },

    paymentDate: {
        type: String,
        default: ""
    },

    receiptNumber: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Fee", FeeSchema);