import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useChatContext from "../hooks/useChatContext"
import useDisplayMessagesContext from "../hooks/useDisplayMessageContext"
import {SendTicketMessage} from "../components/SendTicketMessage"
import SubmitTicketMessage from "../components/SubmitTicketMessage"


const Ticket = () => {

    const {ticketNumber} = useParams();
    const { chats, chatDispatch } = useChatContext();
    const {displayMessages, displayMessagesDispatch} = useDisplayMessagesContext();
    const loggedinUser = localStorage.getItem("user");
    const senderEmail =  JSON.parse(loggedinUser).email

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
        <div className ="inital-request">
            {initialRequest}
        </div>
            {displayMessages && displayMessages.map(message => {
                return <div key = {message._id}>
                    <h4>{message.senderEmail}</h4>
                    <h5>{message.content}</h5>
                </div>
            })}
            <SubmitTicketMessage ticketNumber = {ticketNumber} senderEmail = {senderEmail} />
            {/* <SendTicketMessage ticketNumber={ticketNumber} displayMessages = {displayMessages} displayMessagesDispatch ={displayMessagesDispatch}/> */}
        </>
    )
}

export default Ticket;