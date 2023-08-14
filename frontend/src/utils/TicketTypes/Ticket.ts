import { UserField } from "../ChatTypes/UserTypes";

export interface Category {
  _id: string;
  category: string;
}
export interface Ticket {
  _id: string;
  client: string;
  email: string;
  clientName: string;
  category: Category;
  initialRequest: string;
  assignedTo: UserField;
  status:
    | "New"
    | "Assigned"
    | "In Progress"
    | "Updated By Client"
    | "Waiting for Client Resopnse"
    | "Completed";
  subject: string;
  ticketNumber: string;
}

export interface TicketMessage {
  _id: string;
  senderEmail: string;
  messageType: "ticket";
  content: string;
  senderName: string;
  ticketNumber: string;
  invisible: boolean;
}

export type StatusType =
  | "New"
  | "Assigned"
  | "In Progress"
  | "Updated By Client"
  | "Waiting for Client Resopnse"
  | "Completed";
