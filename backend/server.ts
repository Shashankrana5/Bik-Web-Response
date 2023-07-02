import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/routes";
import deserializeUser from "./src/middleware/deserializeUser";
import mongoose from "mongoose";

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

  mongoose.connect("mongodb+srv://shashankrana316:1234@tut.pehxmoj.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        app.listen(1913, () => console.log(`Connected to the database and my server is running in port 1913`));
    })
    .catch((error) => {
        console.log(error)
    })
  routes(app);
}

main();
