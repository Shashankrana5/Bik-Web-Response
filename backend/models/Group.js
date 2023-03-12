"use strict";
const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
    users: {
        type: Array,
        require: true
    },
    admins: {
        type: Array,
        require: true
    },
    name: {
        type: String,
        require: false
    }
});
module.exports = mongoose.model("Group", groupSchema);
