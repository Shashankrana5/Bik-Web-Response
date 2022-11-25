import { useState } from "react";
import { useTicketContext } from "../hooks/useTicketContext";


const TicketCreationForm = () => {

    const { dispatch } = useTicketContext();

    const [clientName, setClientName] = useState("");
    const [resolved, setResolved] = useState(false);

    const handleSubmit = async (e) =>{

        e.preventDefault();

        const ticket = {clientName, resolved};
        const response = await fetch("/api/", {
            method: "POST",
            body: JSON.stringify(ticket),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json();
        setClientName("")
        document.querySelector("#client-create-form").reset();
        console.log("Ticket has been added", json);
        dispatch({type: 'CREATE_TICKET', payload: json})

    }
    return (
        <form id = "client-create-form" onSubmit = {handleSubmit}>
            <h3>Create a new ticket</h3>
            <label>Client name</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setClientName(e.target.value)}></input>
            <button id = "ticket-create-btn">Create a new ticket</button>
        </form>
    )
}

export default TicketCreationForm;