import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useChatContext from "../hooks/useChatContext"
import useDisplayMessagesContext from "../hooks/useDisplayMessageContext"
import {SendTicketMessage} from "../components/SendTicketMessage"


const Ticket = () => {

    const {ticketNumber} = useParams();
    const { chats, chatDispatch } = useChatContext();
    const {displayMessages, displayMessagesDispatch} = useDisplayMessagesContext();

    const [initialRequest, setInitialRequest] = useState();

    useEffect(() => {

        const fetchTicket = async() => {
            const response = await fetch("/api/"+ ticketNumber, {method:"GET"});
            const json = await response.json()
            setInitialRequest(json[0].initialRequest);
        }

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
        fetchTicket();
        fetchMessages()
    }, [])
    return (
        <>
        <div className ="inital">
            {initialRequest}
        </div>
            {displayMessages && displayMessages.map(message => {
                return <div>
                    <h4>{message.senderEmail}</h4>
                    <h5>{message.content}</h5>
                </div>
            })}
            <SendTicketMessage ticketNumber={ticketNumber} displayMessages = {displayMessages} displayMessagesDispatch ={displayMessagesDispatch}/>
        </>
    )
}

export default Ticket;