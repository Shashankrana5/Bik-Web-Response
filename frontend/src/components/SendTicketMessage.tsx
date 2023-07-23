import axios from "axios";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext"
import { useParams } from "react-router-dom";
import { useTicketContentContext } from "../hooks/useTicketContentContext";
import { Socket } from "socket.io-client";

interface SendTicketMessageProps {
    ticketSocket: Socket | null;
}
export const SendTicketMessage = (props: SendTicketMessageProps) => {
    
    const { ticketSocket } = props;
    const { currentUser } = useCurrentUserContext();
    const {ticketNumber} = useParams();
    const { ticketContentDispatch } = useTicketContentContext();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const response = await axios.post("http://localhost:1913/api/ticket/createticketmessage", {
            currentUser,
            ticketNumber,
            //@ts-ignore
            content: e.target.sendTicketMessageInput.value,
            //@ts-ignore
            invisible: e.target.sendTicketMessageCheckbox.checked
        })

        if(response && ticketSocket){

            //@ts-ignore
            ticketContentDispatch({type: "CREATE_TICKET_CONTENT", payload: response.data});
            ticketSocket.emit("send-ticket-message", response.data);
        }
        //@ts-ignore
        e.target.sendTicketMessageInput.value = ""
    }

    return (
        <form id = "submit-ticket-message-main" onSubmit={handleSubmit}>
            <input id="sendTicketMessageInput" placeholder="say something"/>
            <label>Invisible</label>
            <input id="sendTicketMessageCheckbox" type="checkbox"/>
            <button id="sendTicketMessageSubmitButtom" type="submit" >Send</button>
        </form>
    )
}