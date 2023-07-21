import axios from "axios";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext"
import { useParams } from "react-router-dom";

export const SendTicketMessage = () => {
    const { currentUser } = useCurrentUserContext();
    const {ticketNumber} = useParams();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("cliekd");
        const response = await axios.post("http://localhost:1913/api/ticket/createticketmessage", {
            currentUser,
            ticketNumber,
            //@ts-ignore
            content: e.target.sendTicketMessageInput.value,
            invisible: false
        })

        console.log(response.data);
    }



    return (
        <form id = "submit-ticket-message-main" onSubmit={handleSubmit}>
            <input id="sendTicketMessageInput" placeholder="say something"/>
            <button id="sendTicketMessageSubmitButtom" type="submit">Send</button>
        </form>
    )
}