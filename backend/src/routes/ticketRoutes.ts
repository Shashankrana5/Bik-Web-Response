import { Express } from "express";
import {createTicket,
getTicketByTicketNumber,
getTicketByAssignedTo} from "../controllers/ticketController";

function ticketRoutes(app: Express) {
  app.post("/api/ticket/createticket", createTicket);
  app.get("/api/ticket/getbyticketnumber/:ticketnumber", getTicketByTicketNumber);
  app.get("/api/ticket/getbyassignee", getTicketByAssignedTo);
}

export default ticketRoutes;
