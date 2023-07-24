import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionRoutes from "./src/routes/sessionRoutes";
import deserializeUser from "./src/middlewares/deserializeUser";
import userRoutes from "./src/routes/userRoutes";
import mongoose from "mongoose";
import messageRoutes from "./src/routes/messageRoutes";
import groupRoutes from "./src/routes/groupRoutes";
import { ChatServerSocket } from "./socket";
import http from "http";
import categoryRoutes from "./src/routes/categoryRoutes";
import ticketRoutes from "./src/routes/ticketRoutes";
import * as dotenv from "dotenv";
import searchRoutes from "./src/routes/searchRoutes";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
  }),
);

const chatServer = http.createServer(app);

new ChatServerSocket(chatServer);

function main() {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      app.listen(process.env.SERVER_PORT, () =>
        console.log(
          `Connected to the database and my server is running in port ${process.env.SERVER_PORT}`,
        ),
      );
    })
    .catch((error) => {
      console.log(error);
    });
  sessionRoutes(app);
  userRoutes(app);
  messageRoutes(app);
  groupRoutes(app);
  categoryRoutes(app);
  ticketRoutes(app);
  searchRoutes(app);
}

main();
