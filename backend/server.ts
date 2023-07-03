import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionRoutes from "./src/routes/sessionRoutes";
import deserializeUser from "./src/middleware/deserializeUser";
import userRoutes from "./src/routes/userRoutes";

import mongoose from "mongoose";
import messageRoutes from "./src/routes/messageRoutes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:1912",
  })
);


function main() {

  // mongoose.connect("mongodb+srv://shashankrana316:1234@tut.pehxmoj.mongodb.net/?retryWrites=true&w=majority")
  mongoose.connect("mongodb+srv://shashankrana316:1234@ticketdb.6ejh54s.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        app.listen(1913, () => console.log(`Connected to the database and my server is running in port 1913`));
    })
    .catch((error) => {
        console.log(error)
    })
    sessionRoutes(app);
    userRoutes(app);
    messageRoutes(app);
}

main();
