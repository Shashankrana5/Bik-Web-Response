import { Express } from "express";
import { addUser, getAdmins, getUserByEmail, getUserById } from "../controller/userController";

function userRoutes(app: Express) {

  app.get("/api/user/getbyid/:id", getUserById);
  app.get("/api/user/getbyemail/:email", getUserByEmail);
  app.get("/api/user/getadmins", getAdmins);
  app.post("/api/user/adduser", addUser);
}

export default userRoutes;
