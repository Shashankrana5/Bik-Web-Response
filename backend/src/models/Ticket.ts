import mongoose, { Schema } from "mongoose";

type Status =
  | "New"
  | "Assigned"
  | "In Progress"
  | "Updated By Client"
  | "Waiting for Client Resopnse"
  | "Completed";

const ticketSchema = new Schema(
  {
    ticketNumber: {
      type: String,
      require: true,
      unique: true,
    },
    clientName: {
      type: String,
      require: true,
    },
    client: {
      type: Schema.Types.Mixed,
      ref: "User",
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.Mixed,
      ref: "Category",
      require: true,
    },
    initialRequest: {
      type: String,
      require: true,
    },
    status: {
      type: String as () => Status,
      require: true,
    },
    assignedTo: {
      type: Schema.Types.Mixed,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true },
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
