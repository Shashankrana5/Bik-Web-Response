mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({

    senderEmail: {
        type: String,
        require: true,
    },
    receiverEmail: {
        type: String,
        require: true
    },
    ticketNumber:{
        type:String,
        require: true
    },
    subject:{
        type: String, 
        require: true
    },
    body:{
        type: String,
        require: true
    }
}, {timeStamps: true})

module.exports = mongoose.model("Email", emailSchema)