const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    users: {
        type: Object,
        require: true
    },
    admins: {
        type: Object,
        require: true
    },

    name:{
        type: String,
        require: false
    }

})


module.exports = mongoose.model("Group", groupSchema);
