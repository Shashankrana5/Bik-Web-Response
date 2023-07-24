import { Express } from "express";
import { searchUser } from "../controllers/searchController";

export default function searchRoutes(app: Express) {
  app.post("/api/search/searchuser", searchUser);
}
