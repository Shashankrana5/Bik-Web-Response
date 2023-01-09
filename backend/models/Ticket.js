const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    // _id: {
    //     type:String, 
    //     require: true
    // },
    clientName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    subject: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    body: {
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