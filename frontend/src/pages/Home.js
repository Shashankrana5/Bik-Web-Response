import { useEffect, useState } from "react";
import axios from "axios"

const Home = () => {
  
    const [tickets, setTickets] = useState([])
    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch("/api/getall")
            const json = await response.json()

            if(response.ok){
                setTickets(json)
            }
        }
        fetchTickets()
    }, [setTickets]) 

  return <div className="home">
    <h2>holllo</h2>
    {tickets.map((ticket) => {  
        return <p key = {ticket._id}>{ticket.clientName}</p>
    })}
    {/* <button onClick = {handler}>Click me</button> */}
  </div>;
};

export default Home;
