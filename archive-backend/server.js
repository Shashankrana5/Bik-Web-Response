const dotevn = require("dotenv").config();
const express = require("express");
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT;
const mongoose = require("mongoose");
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors");
const nodemailer = require("nodemailer")
const Server = require("socket.io")

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors:{
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    },
})


app.options("*",cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//Middleware:
app.use(express.json());

app.use(errorHandler);

app.use("/api/", require("./routes/tickets"))
app.use("/api/users/", require("./routes/users"))
app.use("/api/message/", require("./routes/message"))
app.use("/api/email/", require("./routes/email"))
app.use("/api/group/", require("./routes/group"))
app.use("/api/category/", require("./routes/category"))

let activeUserChats = new Object();
let activeTicketChats = new Object();
let activeGroupChats = new Object();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })

io.of("/personalchat").on('connection', socket => {

    console.log(`A user has personal chat joined with id: ${socket.id} and email: ${socket.handshake.query.name}`)

    const userSocketId = socket.id;
    const userEmail = socket.handshake.query.name;

    if (userEmail in activeUserChats){
        (activeUserChats[userEmail]).add(userSocketId);
    }
    else{
        activeUserChats[userEmail] = new Set([userSocketId]);
    }

    socket.on("send-personal-message", data => {
        
        if (activeUserChats[data.receiverEmail]){
            for (let socketAddress of activeUserChats[data.receiverEmail]){

                socket.to(socketAddress).emit("receive-personal-message", data);
            }
        }
    })

    socket.on("disconnect", event =>{
        // console.log(`A user has personal chat left with id: ${userSocketId} and email: ${userEmail}`)
        activeUserChats[userEmail].delete(userSocketId);
    })

})
io.of("/ticketchat").on("connection", socket => {
    // console.log(`A user has joined ticket chat with id: ${socket.id} and email: ${socket.handshake.query.name}`)
    
    const userSocketId = socket.id;
    const userEmail = socket.handshake.query.name;
    activeTicketChats[userEmail] = userSocketId;

    socket.on("join-ticket", data => {
        console.log("user awant to joing " + data)
        socket.join(data);
    })

    socket.on("send-ticket-message", data =>{
        socket.to(data.ticketNumber).emit("receive-ticket-message", data)
    })
})

io.of("/groupchat").on("connection", socket => {

    const userSocketId = socket.id;
    const userEmail = socket.handshake.query.senderEmail;

    console.log(`Group chat has user ${userSocketId} with email ${userEmail}`);

    socket.on("join-groupchat", groupId => {
        socket.join(groupId);
    })

    socket.on("send-groupchat-message", data => {
        socket.to(data.groupId).emit("receive-groupchat-message", data);
    })
})

server.listen(9000, () => console.log("Chat server is up and running"))

