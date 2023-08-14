import { Express } from "express";
import {
  createTodo,
  getTodosByUserId,
  updateTodo,
} from "../controllers/todoController";

function todoRoutes(app: Express) {
  app.post("/api/todo/createtodo", createTodo);
  app.get("/api/todo/gettodo/:id", getTodosByUserId);
  app.put("/api/todo/updatetodo/", updateTodo);
}

export default todoRoutes;
