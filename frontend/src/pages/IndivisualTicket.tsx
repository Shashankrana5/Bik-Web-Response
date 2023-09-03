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
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// ticketdetails (main page)
//      clientDetails
//      ticketcontent
//          initial request
//          ticket contents.
//          send ticket message.

//ticket/:id page
const IndivisualTicket = () => {
  const { ticketNumber } = useParams();
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null);
  const [client, setClient] = useState<UserField>({
    _id: "",
    email: "",
    fullName: "",
    role: "",
  });

  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [minimizeSidebar, setMinimizeSidebar] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setTicketInfo(response.data.ticket);
      setClient(response.data.client);
      setIsLoading(false);
    };
    if (ticketNumber) {
      fetchTicketDetails();
    }
  }, [ticketNumber, currentUser]);

  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <div id="indivisua-ticket-main" className="flex flex-1  min-h-screen">
        <Sidebar
          minimizeSidebar={minimizeSidebar}
          showChat={showChat}
          setShowChat={setShowChat}
        />
        <div className="nav-and-body bg-amber-50 flex-grow">
          <Navbar
            currentUser={currentUser!}
            setMinimizeSidebar={setMinimizeSidebar}
          />
          <div className="main-body">
            <div className="body flex justify-center">
              <div className="body-source w-fill ">
                <div id="ticket-details-main" className="flex flex-row">
                  <div
                    id="left-container"
                    className="min-w-[30vw] max-w-[35vw]"
                  >
                    <div id="client-details-container" className="p-3">
                      <ClientDetails
                        ticketDetails={ticketInfo}
                        currentClient={client}
                        setCurrentClient={setClient}
                      />
                    </div>
                    <div id="ticket-details-container" className="p3">
                      <TicketDetails
                        ticketInfo={ticketInfo}
                        currentClient={client}
                        setCurrentClient={setClient}
                      />
                    </div>
                  </div>
                  <div id="right-container" className="flex-grow">
                    <div id="ticket-content" className="w-fill">
                      {ticketInfo && (
                        <TicketContent ticketDetails={ticketInfo} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default IndivisualTicket;
