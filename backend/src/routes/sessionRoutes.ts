import { Express } from "express";
import {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
} from "../controller/sessionController";
import { requireUser } from "../middleware/requireUser";

function sessionRoutes(app: Express) {
  // login
  app.post("/api/session", createSessionHandler);
  // get the current session

  app.get("/api/session", requireUser, getSessionHandler);
  // logout
  app.delete("/api/session", requireUser, deleteSessionHandler);
}

export default sessionRoutes;
