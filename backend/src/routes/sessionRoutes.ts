import { Express } from "express";
import {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
  verifySession,
} from "../controllers/sessionController";
import { requireUser } from "../middlewares/requireUser";

function sessionRoutes(app: Express) {
  // login
  app.post("/api/session", createSessionHandler);
  // get the current session

  app.get("/api/session", requireUser, getSessionHandler);
  // logout
  app.delete("/api/session", requireUser, deleteSessionHandler);

  app.post("/api/session/validate", verifySession);
}

export default sessionRoutes;
