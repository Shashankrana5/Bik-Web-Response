import { useEffect } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext"
import axios from "axios";
import { useTicketContext } from "../hooks/useTicketContext";
import { useNavigate } from "react-router-dom";

export const DisplayTicket = () => {
    const {currentUser } = useCurrentUserContext();
    const { tickets, ticketsDispatch } = useTicketContext();
    const navigate = useNavigate();

    // const options = {
    //     user: currentUser,
    //     createdAt: true,
    //     updatedAt: true,
    //     email: true,
    //     ticketNumber: true,

    // }
    useEffect(() => {
        const fetchTickets = async() => {
            const response = await axios.post("http://localhost:1913/api/ticket/getbyassignee", {assignedTo: currentUser});
            ticketsDispatch({type: "SET_Ticket", payload: response.data});
        }

        if(currentUser)
            fetchTickets();
    }, [currentUser])


    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        //@ts-ignore
        navigate(`/ticket/${e.target.id.substring(3)}`)

    }

    return (
        <div id="display-ticket-main">
            <div id = "rows-container">
                {tickets && tickets.map((ticket, index) => {
                    return(<div id = {"row" + index} key = {ticket._id} className="cursor-pointer flex gap-2" onDoubleClick={e => handleDoubleClick(e)}>

                            <div id = {"rcn" + ticket.ticketNumber} className = "row-client-name">{ticket.clientName}</div>
                            <div id = {"rce" + ticket.ticketNumber} className = "row-client-email">{ticket.email}</div>
                            <div id = {"rtn" + ticket.ticketNumber} className = "row-ticket-number">{ticket.ticketNumber}</div>
                            <div id = {"rsb" + ticket.ticketNumber} className = "row-subject">{ticket.subject}</div>
                            <div id = {"rct" + ticket.ticketNumber} className = "row-category">{ticket.category.category}</div>
                            <div id = {"rst" + ticket.ticketNumber} className = "row-status">{ticket.status}</div>
                            <div id = {"ras" + ticket.ticketNumber} className="row-assigned-to">{ticket.assignedTo.fullName}</div>
                            <div id = {"rup" + ticket.ticketNumber} className="row-updated-at">{
                            //@ts-ignore
                            ticket.updatedAt}</div>


                    </div>)
                })}
            </div>
        </div>
    )
}

/**
 * client
: 
null
clientName
: 
"asdf"
createdAt
: 
"2023-07-20T03:05:54.578Z"
email
: 
"asdf"
initialRequest
: 
"asdf"
resolved
: 
false
subject

 */