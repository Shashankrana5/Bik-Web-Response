import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { getPersonalChats } from "./src/db/messagedb";

export class ChatServerSocket {
    public static instance: ChatServerSocket;
    public io: Server;

    public users: {[id: string]: string};
    public activeUsers: {[email: string]: Set<string>};
    constructor(chatServer: HTTPServer){
        this.users = {};
        this.activeUsers = {};

        this.io = new Server(chatServer, {
            cors:{
                origin: `http://localhost:${process.env.CLIENT_PORT}`, 
                methods: ["GET", "POST"]
            },
          })
          this.startListeners(this.io);
          chatServer.listen(1914, () => console.log("Chat server is up and running"))

    }

    startListeners(io: Server) {
        
        io.of("/personalchat").on("connection", socket => {

            const user = JSON.parse(socket.handshake.query.currentUser as string);
            if(this.activeUsers[user.email] === undefined){
                this.activeUsers[user.email] = new Set([socket.id])
            }
            else{
                this.activeUsers[user.email].add(socket.id);
            }
            
            socket.on("fetch-status-personal", chats => {

                const friendsActiveSocket:any = new Array();
                //send to others that you are active.
                chats.forEach((userChatted:any) => {
                    if(this.activeUsers[userChatted.email]){
                        this.activeUsers[userChatted.email].forEach(receivingSocket => {
                            socket.to(receivingSocket).emit("user-status-online", user);
                        })

                        friendsActiveSocket.push(userChatted);
                    }
                })
                //get others' status.
                this.activeUsers[user.email].forEach(() => {
                    socket.emit("friends-status-online", friendsActiveSocket);
                })
            })

            
            socket.on("send-personal-message", (data) => {
                if(this.activeUsers[data.receiverEmail]){
                    for(let socketAddress of this.activeUsers[data.receiverEmail]){
                        socket.to(socketAddress).emit("receive-personal-message", data);
                    }
                }
            })

            socket.on("disconnect", () => {
                this.activeUsers[user.email].delete(socket.id);
                if(this.activeUsers[user.email].size === 0){
                    getPersonalChats(user.email).then(setOfUsers => {
                        setOfUsers.forEach((userChatted: any) => {
                            if(this.activeUsers[userChatted] !== undefined){
                                this.activeUsers[userChatted].forEach(receivingSocket => {
                                    socket.to(receivingSocket).emit("friends-status-offline", user);
                                })
                            }
                        })
                    })
                    delete this.activeUsers[user.email];
                }
                
            })
        
        })

        io.of("/groupchat").on("connection", socket => {

            socket.on("join-groupchat", groupId => {
                socket.join(groupId);
            })
            socket.on("send-groupchat-message", data => {
                socket.to(data.groupId).emit("receive-groupchat-message", data);
            })
        })

        io.of("/ticketchat").on("connection", socket => {

            socket.on("join-ticket", data => {
                socket.join(data);
            })
        
            socket.on("send-ticket-message", data =>{
                socket.to(data.ticketNumber).emit("receive-ticket-message", data)
            })
        })

    }

}