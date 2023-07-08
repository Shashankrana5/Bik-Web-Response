import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionRoutes from "./src/routes/sessionRoutes";
import deserializeUser from "./src/middleware/deserializeUser";
import userRoutes from "./src/routes/userRoutes";
import mongoose from "mongoose";
import messageRoutes from "./src/routes/messageRoutes";
import groupRoutes from "./src/routes/groupRoutes";
import { ChatServerSocket } from "./socket";
const socketio = require("socket.io")
const http = require("http")

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:1912",

  })
);

const chatServer = http.createServer(app);

new ChatServerSocket(chatServer);
// //@ts-ignore
// io.on("connection", socket => {
//   console.log(socket.id);
// })



// let activeUserChats = new Object();
// let activeTicketChats = new Object();
// let activeGroupChats = new Object();

// //@ts-ignore
// io.of("/personalchat").on('connection', socket => {

//   console.log(`A user has personal chat joined with id: ${socket.id} and email: ${socket.handshake.query.name}`)

//   const userSocketId = socket.id;
//   const userEmail = socket.handshake.query.name;

//   if (userEmail in activeUserChats){
// //@ts-ignore

//       (activeUserChats[userEmail]).add(userSocketId);
//   }
//   else{
// //@ts-ignore

//       activeUserChats[userEmail] = new Set([userSocketId]);
//   }
// //@ts-ignore

//   socket.on("send-personal-message", data => {
// //@ts-ignore
      
//       if (activeUserChats[data.receiverEmail]){
// //@ts-ignore

//           for (let socketAddress of activeUserChats[data.receiverEmail]){

//               socket.to(socketAddress).emit("receive-personal-message", data);
//           }
//       }
//   })
// //@ts-ignore

//   socket.on("disconnect", event =>{
//       // console.log(`A user has personal chat left with id: ${userSocketId} and email: ${userEmail}`)
// //@ts-ignore
      
//       activeUserChats[userEmail].delete(userSocketId);
//   })

// })
// //@ts-ignore

// io.of("/ticketchat").on("connection", socket => {
//   // console.log(`A user has joined ticket chat with id: ${socket.id} and email: ${socket.handshake.query.name}`)
  
//   const userSocketId = socket.id;
//   const userEmail = socket.handshake.query.name;
// //@ts-ignore

//   activeTicketChats[userEmail] = userSocketId;

// //@ts-ignore

//   socket.on("join-ticket", data => {
//       console.log("user awant to joing " + data)
//       socket.join(data);
//   })

// //@ts-ignore

//   socket.on("send-ticket-message", data =>{
//       socket.to(data.ticketNumber).emit("receive-ticket-message", data)
//   })
// })

// //@ts-ignore

// io.of("/groupchat").on("connection", socket => {

//   const userSocketId = socket.id;
//   const userEmail = socket.handshake.query.senderEmail;

//   console.log(`Group chat has user ${userSocketId} with email ${userEmail}`);

// //@ts-ignore

//   socket.on("join-groupchat", groupId => {
//       socket.join(groupId);
//   })
// //@ts-ignore

//   socket.on("send-groupchat-message", data => {
//       socket.to(data.groupId).emit("receive-groupchat-message", data);
//   })
// })



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
    groupRoutes(app)
}

main();
