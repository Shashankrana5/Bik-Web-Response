import { useEffect } from "react";
import axios, { HttpStatusCode } from "axios";
import AssignedTicketDetails from "../components/AssignedTicketDetails";
import useAssignedTicketsContext from "../hooks/useAssignedTicketsContext";

const Ticket = () => {
  const { assignedTickets, dispatch } = useAssignedTicketsContext();

  useEffect(() => {
    const fetchTickets = async () => {
      const loggedinUser = localStorage.getItem("user");
      const loggedinUserEmail = JSON.parse(loggedinUser).email;
      // const tickets = await axios.post("/api/getassigned", {assignedTo: loggedinUserEmail})
      const tickets = await fetch("/api/getassigned", {
        method: "POST",
        body: JSON.stringify({ assignedTo: loggedinUserEmail }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const json = await tickets.json();



      if (tickets.status == 200) 
        dispatch({ type: "SET_ASSIGNED_TICKETS", payload: json });

    };
    fetchTickets();
  }, [dispatch]);

  return (
    <>
    {
         assignedTickets && assignedTickets.map((ticket) => {

            return <div className="list-container" key = {ticket._id}>
                 <p>{ticket.clientName}</p>
                </div>
               
          })
    }
    </>

  );
};

export default Ticket;
