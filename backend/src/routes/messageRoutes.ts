import { Express } from "express";
import { getChatsByEmail, sendMessage, getMessagesByEmails } from "../controller/messageController";

export default function messageRoutes(app:Express){

    app.get("/api/message/getchatsbyemail/:email", getChatsByEmail);
    app.get("/api/message/getmessagebyemails", getMessagesByEmails);
    app.post("/api/message/sendMessage", sendMessage);
    
}