import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";


const SubmitMessage = ({subject, ticketNumber, senderEmail, emailCheck, receiverEmail}) => {
    
    const { displayMessagesDispatch } = useDisplayMessageContext();
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
                displayMessagesDispatch({type: "CREATE_MESSAGES", payload: data})
            })
        }
      }, [ticketChatSocket])

      const handleSubmit = async(e) => {

        e.preventDefault();
        
        if (emailCheck){
          const emailResponse = await fetch("/api/email/", {
            method: "POST",
            body: JSON.stringify({subject: "[RE] " + subject, senderEmail, receiverEmail, ticketNumber, body: content }),
            headers: {
              "Content-Type": "Application/json"
          }
          })
        } 

        const messageData = {ticketNumber, senderEmail, content, messageType: "ticket"};
        const response = await fetch("/api/message/sendmessage", {
          method: "POST",
          body: JSON.stringify(messageData),
          headers:{
            "Content-Type": "Application/json"
          }
        });
        const json = await response.json();
        displayMessagesDispatch({type: "CREATE_MESSAGES", payload: json});

        ticketChatSocket.emit("send-ticket-message", json);
      }
    return (
        <>
            <input placeholder="type something to respond to ticket" onChange={e => setContent(e.target.value)}/> 
            <button type = "submit" onClick={handleSubmit}>submit ticket message</button>
            
        </>
    )
}

export default SubmitMessage;