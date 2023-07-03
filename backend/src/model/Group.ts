import mongoose, {Schema} from "mongoose";

const groupSchema = new Schema({
    users: {
        type: Object,
        require: true
    },
    admins: {
        type: Object,
        require: true
    },
    groupName: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model("Group", groupSchema);