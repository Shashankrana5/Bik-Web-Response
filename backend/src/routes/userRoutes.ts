import { Express } from "express";
import { addUser, getUserByEmail, getUserById } from "../controller/userController";

function userRoutes(app: Express) {

  app.get("/api/user/getbyid/:id", getUserById);
  app.get("/api/user/getbyemail/:email", getUserByEmail);
  app.post("/api/user/adduser", addUser);
}

export default userRoutes;
