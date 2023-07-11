import mongoose, {Schema} from "mongoose";
import { GroupType } from "../utils/ChatType/ChatType";

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
    },
    messages: [
        {type: Schema.Types.Mixed, ref: "Message", require: true}
    ]
}, {timestamps: true});

const Group =  mongoose.model<GroupType>("Group", groupSchema);
export default Group;