import { Express } from "express";
import {
  getChatsByEmail,
  sendMessage,
  getMessagesByEmails,
  getGroupMessage,
  getMessageByTicketNumber,
  getUnreadMessagesByEmail,
  setAllMessagesToRead,
} from "../controllers/messageController";

export default function messageRoutes(app: Express) {
  app.get("/api/message/getchatsbyemail/:email", getChatsByEmail);
  app.get(
    "/api/message/getmessagebyemails/:senderEmail/to/:receiverEmail",
    getMessagesByEmails,
  );
  app.get("/api/message/getgroupmessage/:_id/user/:email", getGroupMessage);
  app.post("/api/message/sendmessage", sendMessage);
  app.get(
    "/api/message/getmessagebyticketnumber/:ticketNumber",
    getMessageByTicketNumber,
  );
  app.get("/api/message/getunreadbyemail/:email", getUnreadMessagesByEmail);
  app.put("/api/message/setread", setAllMessagesToRead);
}
