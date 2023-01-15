import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TicketCreationForm from "../components/TicketCreationForm";
import TicketDetails from "../components/TicketDetails";
import { useTicketContext } from "../hooks/useTicketContext";
// import axios from "axios"

const Home = () => {
  const { tickets, dispatch } = useTicketContext();
  const loggedinUser = localStorage.getItem("user");
  const loggedinUserEmail = JSON.parse(loggedinUser).email;
  const [user, setUser]= useState(null)
  
  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("/api/getall");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TICKET", payload: json });
      }
    };
    fetchTickets();
  }, [dispatch]);

  useEffect( () => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/getuser", {
      method: "POST",
      body: JSON.stringify({email: loggedinUserEmail}),
      headers: {
        "Content-Type": "Application/json"
      }
  
    })
    const json = await response.json();
    setUser(json)
    
  }
  fetchUser()
  }, [])
  
  if (user && user[0]["role"] === "USER")
  console.log(user[0].role)

  else if (user && user[0]["role"] === "ADMIN"){
  return (
    <div className="home">
      <Navbar />
      {console.log(user)}
      <TicketCreationForm/>
      <h2>holllo</h2>
      {tickets && tickets.map((ticket) => (<TicketDetails key={ticket._id} ticket={ticket}/> ))}
      <div className="create-ticket">
      </div>
    </div>
  );
  }
};

export default Home;
