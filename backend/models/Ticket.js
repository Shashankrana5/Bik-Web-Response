const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    clientName: {
        type: String,
        require: true
    },
    resolved:{
        type: Boolean,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Ticket", ticketSchema);