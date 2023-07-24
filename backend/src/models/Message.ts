import mongoose, { Schema } from "mongoose";
import { MessageType } from "../utils/ChatType/ChatType";

//We need atleast the receiver's email or groupId.
const messageSchema = new Schema(
  {
    senderEmail: {
      type: String,
      require: true,
    },
    senderName: {
      type: String,
      require: true,
    },
    messageType: {
      type: String,
      require: true,
    },
    groupId: {
      type: String,
      require: false,
    },
    receiverEmail: {
      type: String,
      require: false,
    },
    invisible: {
      require: false,
      type: Boolean,
    },
    ticketNumber: {
      type: String,
      require: false,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model<MessageType>("Message", messageSchema);
export default Message;
