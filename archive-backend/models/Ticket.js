const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({

    ticketNumber: {
        type: String,
        require: true,
        unique: true
    },
    clientName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    initialRequest: {
        type: String,
        require: true
    },
    resolved:{
        type: Boolean,
        require: true
    },
    assignedTo: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Ticket", ticketSchema);