import { useParams } from "react-router-dom";

const TicketContent = () => {
    const { ticketNumber } = useParams();
    console.log(ticketNumber);
    return(
        <div id="ticket-content-main">
            ticket content component
        </div>
    )
}

export default TicketContent;