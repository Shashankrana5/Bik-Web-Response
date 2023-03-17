import { useEffect, useState } from "react";
import ChatNavigation from "../components/ChatNavigation";
import Navbar from "../components/Navbar";
import TicketCreationForm from "../components/TicketCreationForm";
import TicketDetails from "../components/TicketDetails";
import { useTicketContext } from "../hooks/useTicketContext";
import useChatContext from "../hooks/useChatContext";
import DisplayMessages from "../components/DisplayMessages";
import SendMessage from "../components/ArchivedSendMessage";
import PersonalChat from "../components/PersonalChat";
import UserSearchBar from "../components/UserSearchBar";
import LeftNavBar from "../components/LeftNavbar";
import GroupChat from "../components/GroupChat";
import HomeChat from "../components/HomeChat";

const Home = () => {
  const { tickets, dispatch } = useTicketContext();
  const loggedinUser = localStorage.getItem("user");
  const loggedinUserEmail = JSON.parse(loggedinUser).email;
  const [user, setUser] = useState(null);
  const [minimizeLeftNavbar, setMinimizeLeftNavbar] = useState(false);
  const [createTicket, setCreateTicket] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("http://localhost:4000/api/getall");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TICKET", payload: json });
      }
    };
    fetchTickets();
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:4000/api/users/getuser", {
        method: "POST",
        body: JSON.stringify({ email: loggedinUserEmail }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const json = await response.json();
      setUser(json);
    };
    fetchUser();
  }, []);

  const { chats, chatDispatch } = useChatContext();
  var index = 0;

  useEffect(() => {
    const fetchMessage = async () => {
      const loggedinUser = await localStorage.getItem("user");
      const loggedinUserEmail = await JSON.parse(loggedinUser).email;
      const usersChatted = await fetch(
        "http://localhost:4000/api/message/chatsemail",
        {
          method: "POST",
          body: JSON.stringify({ email: loggedinUserEmail }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await usersChatted.json();

      chatDispatch({ type: "SET_CHAT", payload: json["chats"] });
    };

    fetchMessage();
  }, [chatDispatch]);

  const handleCreateTicket = (e) => {
    const booleanValue = createTicket == true ? false : true;
    setCreateTicket(booleanValue);
  };

  if (user && user[0]["role"] === "USER") {
    return <div className="home-user">this is the user home</div>;
  } else if (user && user[0]["role"] === "ADMIN") {
    return (
      <div className="main-homepage-container flex h-screen">
        <LeftNavBar minimizeLeftNavbar={minimizeLeftNavbar} />
        <div className="nav-and-body bg-amber-50 flex-grow">
          <Navbar
            minimizeLeftNavbar={minimizeLeftNavbar}
            setMinimizeLeftNavbar={setMinimizeLeftNavbar}
          />

          <div className="main-body">
            <div className="body flex justify-center">
              <div className="body-source w-fill ">
                <div className="ticket-creation-form-container flex flex-col ">
                  <div
                    id="ticket-creation-division"
                    className="ticket-creation-nav 
                  flex ml-auto cursor-pointer rounded-md p-2  bg-orange-100 border
                  text-gray-700 md:border-orange-200 md:border-2 hover:bg-orange-300 hover:text-white transition ease-out duration-500"
                    onClick={handleCreateTicket}
                  >
                    <div className="">New Ticket</div>
                    <div className=" w-6 h-6 relative">
                      <button id="transform-button">
                        <span id="transform-button-stick"></span>
                        <span id="transform-button-stick"></span>
                      </button>
                    </div>
                  </div>
                  <TicketCreationForm
                    createTicket={createTicket}
                    setCreateTicket={setCreateTicket}
                  />
                </div>
                {/* <UserSearchBar /> */}
                {/* <div className="show-tickets">
                  {tickets &&
                    tickets.map((ticket) => (
                      <TicketDetails key={ticket._id} ticket={ticket} />
                    ))}
                  <div className="create-ticket"></div>
                </div> */}
                {/* <PersonalChat />
                <GroupChat /> */}
              </div>
            </div>
            <HomeChat />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
