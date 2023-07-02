import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import deserializeUser from "./src/middleware/deserializeUser";
import mongoose from "mongoose";
import routes from "./src/routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(deserializeUser);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:1912",
  })
);
// app.use("/api/session", require("./src/routes/sessionRoutes"));

function main() {
    routes(app);
    const port = 1913
    mongoose.connect("mongodb+srv://shashankrana316:1234@tut.pehxmoj.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })
}

main();