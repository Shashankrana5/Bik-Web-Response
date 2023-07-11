import { Express } from "express";
import { addCategory, getCategories } from "../controllers/categoryController";

export default function categoryRoutes(app: Express) {
  app.get("/api/category/getall", getCategories);
  app.post("/api/category/createcategory", addCategory);
}
