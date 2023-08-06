import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";
import TicketContent from "../components/TicketContent";
import { ClientDetails } from "../components/ClientDetails";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { getSessionData } from "../utils/getSessionData";
import TicketDetails from "../components/TicketDetails";

// ticketdetails (main page)
//      clientDetails
//      ticketcontent
//          initial request
//          ticket contents.
//          send ticket message.

//ticket/:id page
const IndivisualTicket = () => {
  const { ticketNumber } = useParams();
  const [ticketDetails, setTicketDetails] = useState<Ticket | null>(null);
  const [client, setClient] = useState<UserField>({
    _id: "",
    email: "",
    fullName: "",
    role: "",
  });
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
    <div id="ticket-details-main" className="flex flex-row">
      <div id="left-container" className="min-w-[30vw] max-w-[35vw]">
        <div id="client-details-container" className="p-3">
          <ClientDetails
            ticketDetails={ticketDetails}
            currentClient={client}
            setCurrentClient={setClient}
          />
        </div>
        <div id="ticket-details-container" className = "p3">
          <TicketDetails 
                      ticketDetails={ticketDetails}
                      currentClient={client}
                      setCurrentClient={setClient}/>
        </div>
      </div>
      <div id="right-container" className="flex-grow">
        <div id="ticket-content" className="w-fill">
          {ticketDetails && <TicketContent ticketDetails={ticketDetails} />}
        </div>
      </div>
    </div>
  );
};

export default IndivisualTicket;
