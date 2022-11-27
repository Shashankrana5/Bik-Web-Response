const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// The message needs to have atleast the group or the receiver's id
const messageSchema = new Schema({

    senderEmail:{
        type: String,
        require: true
    },
    groupdId: {
        type: String,
        require: false
    },
    receiverEmail:{
        type: String, 
        require: false
    },
    content: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema);