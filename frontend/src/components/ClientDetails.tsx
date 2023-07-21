import { UserField } from "../utils/ChatTypes/UserTypes"
import { Ticket } from "../utils/TicketTypes/Ticket"

interface ClientDetailsProps {
    client: UserField | null;
    ticketDetails: Ticket | null
}
export const ClientDetails = (props: ClientDetailsProps) => {

    const {ticketDetails, client } = props;

    return (
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
    )
}