import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";


const SubmitMessage = ({ticketNumber, senderEmail}) => {
    
    const { displayMessages, displayMessagesDispatch } = useDisplayMessageContext();
    const [content, setContent] = useState("");
    const [ticketChatSocket, setTicketChatSocket] = useState(null) 

    useEffect(() => {
        let init = (io.connect("http://localhost:9000/ticketchat", {
            query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
            // query: `type=personal`
          } ))
          init.emit("join-ticket", ticketNumber);
          setTicketChatSocket(init)
    }, [])
      useEffect(() => {
        if (ticketChatSocket){
            ticketChatSocket.on("receive-ticket-message", data=> {
                console.log(data)
            })
            ticketChatSocket.on('test', data => console.log(data))
        }
      }, [ticketChatSocket])

      const handleSubmit = (e) => {
        e.preventDefault();
        const messageData = {ticketNumber, senderEmail, content, messageType: "ticket"};

        ticketChatSocket.emit("send-ticket-message", messageData);
      }
    return (
        <>
            <input placeholder="type something to respond to ticket" onChange={e => setContent(e.target.value)}/> 
            <button type = "submit" onClick={handleSubmit}>submit ticket message</button>
        </>
    )
}

export default SubmitMessage;