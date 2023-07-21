import { SendTicketMessage } from "./SendTicketMessage";

const TicketContent = () => {


        return(
        <div id="ticket-content-main">
            <div id="ticket-content-initial-request border border-orange-200">
                this is where the initial request goes.
            </div>
            <div id="ticket-content">
                This is where we list the ticket contents.
            </div>
            <SendTicketMessage />
        </div>
    )
}

export default TicketContent;