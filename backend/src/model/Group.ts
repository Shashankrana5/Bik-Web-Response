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

const Group =  mongoose.model("Group", groupSchema);
export default Group;