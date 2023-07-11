import { Express } from "express";
import { findById, addGroup } from "../controllers/groupController";

export default function groupRoutes(app: Express) {
  app.post("/api/group/creategroup", addGroup);
  app.get("/api/group/getbyid/:id", findById);
}
