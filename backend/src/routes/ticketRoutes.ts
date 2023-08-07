import { Express } from "express";
import {
  createTicket,
  getTicketByTicketNumber,
  getTicketByAssignedTo,
  createTicketMessage,
  updateTicket,
  getAllTickets,
} from "../controllers/ticketController";

function ticketRoutes(app: Express) {
  app.post("/api/ticket/createticket", createTicket);
  app.get(
    "/api/ticket/getbyticketnumber/:ticketnumber",
    getTicketByTicketNumber,
  );
  app.post("/api/ticket/getbyassignee", getTicketByAssignedTo);
  app.post("/api/ticket/createticketmessage", createTicketMessage);
  app.post("/api/ticket/updateticket", updateTicket);
  app.get("/api/ticket/getall", getAllTickets);
}

export default ticketRoutes;
