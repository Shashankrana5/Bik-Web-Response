import { Express } from "express";
import {
  createTicket,
  getTicketByTicketNumber,
  getTicketByAssignedTo,
  createTicketMessage,
} from "../controllers/ticketController";

function ticketRoutes(app: Express) {
  app.post("/api/ticket/createticket", createTicket);
  app.get(
    "/api/ticket/getbyticketnumber/:ticketnumber",
    getTicketByTicketNumber,
  );
  app.post("/api/ticket/getbyassignee", getTicketByAssignedTo);
  app.post("/api/ticket/createticketmessage", createTicketMessage);
}

export default ticketRoutes;
