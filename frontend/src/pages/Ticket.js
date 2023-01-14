import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useChatContext from "../hooks/useChatContext"
import    useDisplayMessagesContext from "../hooks/useDisplayMessageContext"


const Ticket = () => {

    const {ticketNumber} = useParams();
    const { chats, chatDispatch } = useChatContext();
    const {displayMessages, displayMessagesDispatch} = useDisplayMessagesContext();

    useEffect(() => {


        const fetchMessages = async()=> {
            const response = await fetch("/api/message/fromticketnumber", {
                method: "POST",
                body: JSON.stringify({ticketNumber}),
                headers:{
                    "Content-Type": "Application/json"
                }
            })
            const json = await response.json()
            if (response.ok){
                displayMessagesDispatch({type:"SET_MESSAGES", payload: json})
            }
        }
        fetchMessages()
    }, [])
    return (
        <>
            {displayMessages && displayMessages.map(message => {
                return <div>
                    <h4>{message.senderEmail}</h4>
                    <h5>{message.content}</h5>
                </div>
            })}
            
        </>
    )
}

export default Ticket;