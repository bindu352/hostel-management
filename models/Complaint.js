const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    complaintTitle: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Electrical", "Plumbing", "Internet", "Furniture", "Cleaning", "Security"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved", "Rejected", "Closed"],
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);