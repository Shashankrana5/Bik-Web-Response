import { useState } from "react"

export const SendTicketMessage = ({ticketNumber, displayMessages, displayMessagesDispatch}) => {

    const [content, setContext] = useState("");
    const senderEmail = JSON.parse(localStorage.getItem("user")).email;

    const handleClick = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("/api/message/sendmessage", {
                method: "POST",
                body: JSON.stringify({ticketNumber, senderEmail, content, messageType: "ticket"}),
                headers:{
                    "Content-Type": "Application/json"
                }
            })
            const json = await response.json();
            displayMessagesDispatch({type:"CREATE_MESSAGES", payload: json})

        }catch(error){
            return {error: error.message}
        }
    }
    
    return (
        <div className="send-ticket-message">
            <input placeholder="type to respond to the ticket" onChange={e => {setContext(e.target.value)}}></input>
            <button onClick={handleClick}>submit</button>
        </div>
    )
}