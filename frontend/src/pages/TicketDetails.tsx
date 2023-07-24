import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";
import TicketContent from "../components/TicketContent";
import { ClientDetails } from "../components/ClientDetails";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { getSessionData } from "../utils/getSessionData";

// ticketdetails (main page)
//      clientDetails
//      ticketcontent
//          initial request
//          ticket contents.
//          send ticket message.

//ticket/:id page
const TicketDetails = () => {
  const { ticketNumber } = useParams();
  const [ticketDetails, setTicketDetails] = useState<Ticket | null>(null);
  const [client, setClient] = useState<UserField | null>(null);
  const { setCurrentUser } = useCurrentUserContext();

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await getSessionData();
      setCurrentUser(response?.data.user);
    };
    sessionCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const response = await axios.get(
        `http://localhost:1913/api/ticket/getbyticketnumber/${ticketNumber}`,
      );
      setTicketDetails(response.data.ticket);
      setClient(response.data.client);
    };
    if (ticketNumber) {
      fetchTicketDetails();
    }
  }, [ticketNumber]);

  return (
    <div id="ticket-details-main">
      <ClientDetails ticketDetails={ticketDetails} client={client} />

      <div
        id="ticket-content"
        className="min-h-[25vh] min-w-[25vw] border border-green-300"
      >
        <TicketContent />
      </div>
    </div>
  );
};

export default TicketDetails;
