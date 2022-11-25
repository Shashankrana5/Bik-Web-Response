import { useTicketContext } from "../hooks/useTicketContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const TicketDetails = ({ticket}) => {
    const { dispatch } = useTicketContext();

    const handleDelete = async() => {

        console.log(ticket._id)
        const response = await fetch("/api/" + ticket._id, {method: "DELETE"})
        
        const json = await response.json();

        console.log(json)
        dispatch({type: "DELETE_TICKET", payload: json})
    }

    return(
        <div className="ticket-details">
            <h2>{ticket.clientName}</h2>
            <h3>{ticket.subject}</h3>
            <h4>{ticket.body}</h4>
            <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
            <button onClick = {handleDelete}>Press to delete this</button>
        </div>
    )
}

export default TicketDetails;