import { useTicketContext } from "../hooks/useTicketContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TicketDetails = ({ticket}) => {
    const {dispatch} = useTicketContext();

    const handleDelete = () => {
        
    }

    return(
        <div className="ticket-details">
            <h4>{ticket.clientName}</h4>
            <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
            <button onClick = {handleDelete}>Press to delete this</button>
        </div>
    )
}

export default TicketDetails;