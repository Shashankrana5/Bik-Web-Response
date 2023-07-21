import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";
import TicketContent from "../components/TicketContent";

//ticket/:id page
const TicketDetails = () => {

    const { ticketNumber } = useParams();
    const [ ticketDetails, setTicketDetails ] = useState<Ticket|null>(null);
    const [ client, setClient ] = useState<UserField | null>(null);

    useEffect(() => {
        const fetchTicketDetails = async() => {
            const response = await axios.get(`http://localhost:1913/api/ticket/getbyticketnumber/${ticketNumber}`)
            setTicketDetails(response.data.ticket);
            setClient(response.data.client);
        }
        if(ticketNumber){
            fetchTicketDetails()
        }
    }, [ticketNumber])

    return <div id="ticket-details-main">

         <div id="client-details" className= "min-h-[25vh] min-w-[25vw] border border-pink-300">
                <div>This is where the client details go:</div>
                {ticketDetails && client && Object.keys(client).map((key, index) => {
                    if(key !== "__v"){
                        return(
                        //@ts-ignore
                        <div key={index}>{client[key]}</div>)
                    }
                    else{
                        return(null)
                    }
                })}
            </div>
        
            <div id="ticket-content" className="min-h-[25vh] min-w-[25vw] border border-green-300">
                <TicketContent />
            </div>
    </div>
}

export default TicketDetails;