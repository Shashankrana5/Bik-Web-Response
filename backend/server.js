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
//Middleware:
app.use(express.json());

app.use(errorHandler);

app.use("/api/", require("./routes/tickets"))
app.use("/api/users", require("./routes/users"))
app.use("/api/message/", require("./routes/message"))
app.use("/api/email/", require("./routes/email"))


var activeUserChats = new Object();
var activeTicketChats = new Object();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })

io.of("/games").on('connection', socket => {
    console.log("connection is made to the new thing.");
    
    socket.emit("welcome", "hellow and welcome")
})

io.of("/personalchat").on('connection', socket => {

    console.log(`A user has personal chat joined with id: ${socket.id} and email: ${socket.handshake.query.name}`)
    const userSocketId = socket.id;
    const userEmail = socket.handshake.query.name;
    // activeUserChats[userEmail] = userSocketId;

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
        console.log(data.ticketNumber)
        socket.to(data.ticketNumber).emit("receive-ticket-message", "something has been received.")
        // socket.to(activeTicketChats[data.senderEmail]).emit('receive-ticket-message', data);
    })
})



// io.on("connection", socket => {
//     // console.log(`A user has joined with id: ${socket.id} and email: ${socket.handshake.query.name}`)
//     const userSocketId = socket.id;
//     const userEmail = socket.handshake.query.name;
//     const typeOfMessage = socket.handshake.query.type;
//     // if (typeOfMessage === "personal"){  
//     //     console.log(true);  
//         activeUserChats[userEmail] = userSocketId;
//     // }
//     // else if (typeOfMessage == "ticket"){
//     //     console.log(false)
//     // }

//     socket.on("send-message", data => {
//         socket.to(activeUserChats[data.receiverEmail]).emit("receive-message", data)
//     })

//     socket.on("disconnect", () => {
//         // console.log(`User with Id; ${userSocketId} has just disconnected.`);
//     })
// })

server.listen(9000, () => console.log("Chat server is up and running"))

