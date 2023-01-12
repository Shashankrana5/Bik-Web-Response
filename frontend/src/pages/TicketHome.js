import { useEffect } from "react";
import axios, { HttpStatusCode } from "axios";
import AssignedTicketDetails from "../components/AssignedTicketDetails";
import useAssignedTicketsContext from "../hooks/useAssignedTicketsContext";

const TicketHome = () => {
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



      if (tickets.ok) 
        dispatch({ type: "SET_ASSIGNED_TICKETS", payload: json });

    };
    fetchTickets();
  }, [dispatch]);

  return (

    // // <>
    // {/* {assignedTickets && assignedTickets.map((ticket) => 

    // (<AssignedTicketDetails key = {ticket._id} ticket = {ticket}/>)


    // )} */}
    
    // // {/* </> */}
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

export default TicketHome;
