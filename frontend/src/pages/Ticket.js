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
    const [emailCheck, setEmailCheck] = useState(false);
    const [initialRequest, setInitialRequest] = useState();
    const [clientEmail, setClientEmail] = useState("");
    const [subject, setSubject]  = useState("");

    useEffect(() => {

        const fetchTicket = async() => {
            const response = await fetch("/api/"+ ticketNumber, {method:"GET"});
            const json = await response.json()
            setSubject(json[0].subject)
            setInitialRequest(json[0].initialRequest);
            setClientEmail(json[0].email);
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

    const handleCheckBox = async() => {
        if (emailCheck === false){
            setEmailCheck(true);
        }
        else{
            setEmailCheck(false);
        }
    }
    return (
        <>

        <div className ="inital-request">
            {initialRequest}

        </div>
        <div className="show-message">
            {displayMessages && displayMessages.map(message => {
                return <div key = {message._id}>
                    <h4>{message.senderEmail}</h4>
                    <h5>{message.content}</h5>
                </div>
            })}
        </div>
            <input type="checkbox" onChange={handleCheckBox}/>
            <SubmitTicketMessage subject = {subject} ticketNumber = {ticketNumber} senderEmail = {senderEmail} emailCheck = {emailCheck} receiverEmail = {clientEmail}/>
            {/* <SendTicketMessage ticketNumber={ticketNumber} displayMessages = {displayMessages} displayMessagesDispatch ={displayMessagesDispatch}/> */}
        </>
    )
}

export default Ticket;