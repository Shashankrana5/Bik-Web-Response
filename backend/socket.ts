import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
const socketio = require("socket.io")

export class ChatServerSocket {
    public static instance: ChatServerSocket;
    public io: Server;

    public users: {[id: string]: string};
    public activeUsers: {[email: string]: Set<string>};
    constructor(chatServer: HTTPServer){
        this.users = {};
        this.activeUsers = {};
        // this.io = new Server(server, {
        //     serveClient: false,
        //     pingInterval: 10000,
        //     pingTimeout: 5000,
        //     cookie: false,
        //     cors: {
        //         origin: "http://localhost:1912"
        //     }
        this.io = new Server(chatServer, {
            cors:{
                origin: "http://localhost:1912", 
                methods: ["GET", "POST"]
            },
          })
          this.startListeners(this.io);
          chatServer.listen(9000, () => console.log("Chat server is up and running"))

    }

    startListeners(io: Server) {
        // io.on("connection", (socket) => {
        //     // console.log(`${socket.id} ${socket.handshake.query.currentUser.email}`)
        //     console.log(socket.handshake.query)
        // })


        
        io.of("/personalchat").on("connection", socket => {

            const user = JSON.parse(socket.handshake.query.currentUser as string);
            if(this.activeUsers[user.email] === undefined){
                this.activeUsers[user.email] = new Set([socket.id])
            }
            else{
                this.activeUsers[user.email].add(socket.id);
            }

            socket.on("send-personal-message", data => {
                console.log(data)
                if(this.activeUsers[data.receiverEmail]){
                    for(let socketAddress of this.activeUsers[data.receiverEmail]){
                        socket.to(socketAddress).emit("receive-personal-message", data);
                    }
                }
            })

            socket.on("disconnect", () => {
                console.log(this.activeUsers)
                this.activeUsers[user.email].delete(socket.id);
            })
        
        })

        io.of("/groupchat").on("connection", socket => {
        //     // console.log(socket.handshake.query.currentUser)

            const user = JSON.parse(socket.handshake.query.currentUser as string);


            // console.log(`Group chat ${socket.id} ${user.email}`)
        })

    }
     
    // startListeners = (socket: Socket) => {

    //     socket.on("connection", () => {
    //         console.log(`${socket.id} has connected`)
    //     })
    //     socket.on("diconnect", () => {
    //         console.log(`${socket.id} has disconnected`)
    //     })
    //     console.log(socket.id)
        
    // }
    // StartListeners = (socket: Socket) => {
    //     console.info("mesage received from " + socket.id);

    //     socket.on("handshake", () => {
    //         console.info("handshake received"); 
    //     })
    //     socket.on("disconnect", () => {
    //         console.info("a user has disconnected");
    //     })
    // }
}