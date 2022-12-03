import { useEffect } from "react";
import Navbar from "../components/Navbar";
import TicketCreationForm from "../components/TicketCreationForm";
import TicketDetails from "../components/TicketDetails";
import { useTicketContext } from "../hooks/useTicketContext";
// import axios from "axios"

const Home = () => {
  const { tickets, dispatch } = useTicketContext();

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("/api/getall");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TICKET", payload: json });
      }
      console.log(json)

    };
    fetchTickets();
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar />
      <h2>holllo</h2>
      {tickets && tickets.map((ticket) => (<TicketDetails key={ticket._id} ticket={ticket}/> ))}
      <div className="create-ticket">
        <TicketCreationForm/>
      </div>
    </div>
  );
};

export default Home;
