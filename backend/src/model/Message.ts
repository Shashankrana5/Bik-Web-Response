import mongoose, { Schema } from "mongoose";

//We need atleast the receiver's email or groupId.
const messageSchema = new Schema({

    senderEmail:{
        type: String,
        require: true
    },
    senderName:{
        type: String,
        require: true
    },
    messageType:{
        type: String,
        require: true
    },
    groupId: {
        type: String,
        require: false
    },
    receiverEmail:{
        type: String, 
        require: false
    },

    ticketNumber: {
        type:String,
        require: false
    },
    content: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema);