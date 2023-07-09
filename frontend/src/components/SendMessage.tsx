import axios from "axios";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from "../utils/ChatTypes/UserTypes";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from 'react';
import { ClientToServerEvents, ServerToClientEvents } from "../utils/Socket.io-clientTypes/Socket.io-client";

interface SendMessageProps {
  selectedChat: SelectedChat | null;
  currentUser: User;
}

const SendMessage = (props: SendMessageProps) => {
  const { dispatch } = useDisplayChatContext();
  const { selectedChat, currentUser } = props;
    const [chatSocket, setChatSocket ] =  useState()

    useEffect(() => {
        // io.connect("http://localhost:9000/personalchat", {
           io("http://localhost:9000/personalchat", {
            query: {currentUser: JSON.stringify(currentUser)}
           })
        // })

        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
        
        


    }, [])









  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    //@ts-ignore
    if (e.target.sendMessageInput.value.length !== 0 && selectedChat !== null) {
    
      const response = await axios.post(
        "http://localhost:1913/api/message/sendmessage",
        {
          selectedChat,
          currentUser,
          //@ts-ignore
          content: e.target.sendMessageInput.value,
        }
      );

    if(response){
      console.log(response.data);
      dispatch({type: "CREATE_MESSAGE", payload: response.data});
    }
    //     const response = {

    //         _id: "6413f3ed09e78c618b1f01a4",
    //         senderEmail: "shashank@xyz.com",
    //         senderName: "Shashank Rana",
    //         receiverName: "Jayson Tatum",
    //         receiverEmail: "jayson@xyz.com",
    //         messageType: "personal",
    //         //@ts-ignore
    //         content: e.target.sendMessageInput.value,
    //         createdAt:"2023-03-17T05:00:29.080+00:00",
    //         updatedAt: "2023-03-17T05:00:29.080+00:00"

   
    // }
    // dispatch({type: "CREATE_MESSAGE", payload: response})
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <input id="sendMessageInput" placeholder="Send message" />
      <button id="sendMessageButton" type="submit">
        Send Message
      </button>
    </form>
  );
};

export default SendMessage;
