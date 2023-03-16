"use strict";
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
        unique: true
    }
});
module.exports = mongoose.model("Category", categorySchema);
