import { useEffect, useState } from "react";
import ChatNavigation from "../components/ChatNavigation";
import Navbar from "../components/Navbar";
import TicketCreationForm from "../components/TicketCreationForm";
import TicketDetails from "../components/TicketDetails";
import { useTicketContext } from "../hooks/useTicketContext";
import useChatContext from "../hooks/useChatContext";
import DisplayMessages from "../components/DisplayMessages";
import SendMessage from "../components/SendMessage";
import PersonalChat from "../components/PersonalChat";
import UserSearchBar from "../components/UserSearchBar";
import LeftNavBar from "../components/LeftNavbar";
import GroupChat from "../components/GroupChat";

const Home = () => {
  const { tickets, dispatch } = useTicketContext();
  const loggedinUser = localStorage.getItem("user");
  const loggedinUserEmail = JSON.parse(loggedinUser).email;
  const [user, setUser] = useState(null);
  const [ minimizeLeftNavbar, setMinimizeLeftNavbar ] = useState(false);

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

  if (user && user[0]["role"] === "USER") {
    return <div className="home-user">this is the user home</div>;
  } else if (user && user[0]["role"] === "ADMIN") {

    return (
      <div className="main-homepage-container flex h-screen">
        <LeftNavBar minimizeLeftNavbar = {minimizeLeftNavbar}/>
        <div className="nav-and-body bg-amber-50 flex-grow">
          <Navbar minimizeLeftNavbar = {minimizeLeftNavbar} setMinimizeLeftNavbar = {setMinimizeLeftNavbar}/>

          <div className="main-body">
            <div className="body flex">
              <div className="body-source w-fill">
                <TicketCreationForm />
                {/* <UserSearchBar /> */}
                {/* {tickets &&
                  tickets.map((ticket) => (
                    <TicketDetails key={ticket._id} ticket={ticket} />
                  ))}
                <div className="create-ticket"></div> */}
                {/* <PersonalChat /> */}
                {/* <GroupChat /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
