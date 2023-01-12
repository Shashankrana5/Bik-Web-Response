const dotevn = require("dotenv").config();
const express = require("express");
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT;
const mongoose = require("mongoose");
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors");
const nodemailer = require("nodemailer")

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors:{
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})
app.options("*",cors())
//Middleware:
app.use(express.json());

app.use(errorHandler);

app.use("/api/", require("./routes/tickets"))
app.use("/api/users", require("./routes/users"))
app.use("/api/message", require("./routes/message"))
app.use("/api/email/", require("./routes/email"))


var activeUserChats = new Object();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })

io.on("connection", socket => {
    // console.log(`A user has joined with id: ${socket.id} and email: ${socket.handshake.query.name}`)
    const userSocketId = socket.id;
    const userEmail = socket.handshake.query.name;
    activeUserChats[userEmail] = userSocketId;

    socket.on("send-message", data => {
        socket.to(activeUserChats[data.receiverEmail]).emit("receive-message", data)
    })

    socket.on("disconnect", () => {
        console.log(`User with Id; ${userSocketId} has just disconnected.`);
    })
})

server.listen(9000, () => console.log("Chat server is up and running"))

