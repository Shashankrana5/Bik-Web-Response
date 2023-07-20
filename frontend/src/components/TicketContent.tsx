import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { UserField } from "../utils/ChatTypes/UserTypes";

const TicketContent = () => {
    const { ticketNumber } = useParams();
    const [ ticketDetails, setTicketDetails ] = useState<Ticket|null>(null);
    const [ client, setClient ] = useState<UserField | null>(null);

    useEffect(() => {
        const fetchTicketDetails = async() => {
            const response = await axios.get(`http://localhost:1913/api/ticket/getbyticketnumber/${ticketNumber}`)
            console.log(response.data);
            setTicketDetails(response.data);
        }
        if(ticketNumber){
            fetchTicketDetails()
        }
    }, [ticketNumber])
    return(
        <div id="ticket-content-main">
            <div className="client-details">
                {ticketDetails && client && Object.keys(client).map((key) => {
                        return(<div>{client[key]}</div>)
                })}
            </div>
        </div>
    )
}

export default TicketContent;