import { Express } from "express";
import { search, searchUser } from "../controllers/searchController";

export default function searchRoutes(app: Express) {
  app.post("/api/search/searchuser", searchUser);
  app.post("/api/search/", search);
}
