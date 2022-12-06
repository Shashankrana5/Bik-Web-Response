const dotevn = require("dotenv").config();
const express = require("express");
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT;
const mongoose = require("mongoose");
const http = require("http")
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors:{
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})

//Middleware:
app.use(express.json());

app.use(errorHandler);

app.use("/api/", require("./routes/tickets"))
app.use("/api/users", require("./routes/users"))
app.use("/api/message", require("./routes/message"))



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })

io.on("connection", socket => {
    console.log(`User has joined: ${socket.id}`)

    // io.emit("connection-successful", socket.id)
    
    socket.on("send-message", data => {

        socket.broadcast.emit("receive-message", data)
    })
})


server.listen(9000, () => console.log("Chat server is up and running"))

