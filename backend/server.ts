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
import imageRoutes from "./src/routes/imageRoutes";
import todoRoutes from "./src/routes/todoRoutes";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
app.use(
  cors({
    credentials: true,
    origin: [
      "http://3.19.150.105",
      "http://localhost:4200",
      "http://bik-web.com",
      "http://localhost",
      "http://3.19.150.105:1912",
      "http://bik-web.com:1912",
      "http://localhost:1912",
    ],
  }),
);

const chatServer = http.createServer(app);

new ChatServerSocket(chatServer);

function main() {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      app.listen(process.env.SERVER_PORT, () =>
        console.log(`DB and server running on: ${process.env.SERVER_PORT}`),
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
  imageRoutes(app);
  todoRoutes(app);
}

main();
