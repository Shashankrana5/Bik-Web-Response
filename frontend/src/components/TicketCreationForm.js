import { useState } from "react";
import { useTicketContext } from "../hooks/useTicketContext";


const TicketCreationForm = () => {

    const { dispatch } = useTicketContext();

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("")
    const [body, setBody] = useState("")
    const [assignedTo, setAssignedTo] = useState("N/a")
    const [resolved, setResolved] = useState(false);

    const handleSubmit = async (e) =>{

        e.preventDefault();

        const ticket = {clientName, email, subject, category, body , resolved, assignedTo};
        const response = await fetch("/api/", {
            method: "POST",
            body: JSON.stringify(ticket),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json();
        setClientName("");
        setEmail("");
        setSubject("");
        setCategory("");
        setBody("");
        setAssignedTo("");
        setResolved(false);

        document.querySelector("#client-create-form").reset();
        console.log("Ticket has been added", json);
        dispatch({type: 'CREATE_TICKET', payload: json})

    }
    return (
        <form id = "client-create-form" onSubmit = {handleSubmit}>
            <h3>Create a new ticket</h3>
            <label>Client name</label>
            
            <input id = "client-name-field" type ="text" onChange={(e) => setClientName(e.target.value)}></input>

            <label>email address</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setEmail(e.target.value)}></input>
            
            <label>subject</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setSubject(e.target.value)}></input>

            <label>Category</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setCategory(e.target.value)}></input>

            <label>body</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setBody(e.target.value)}></input>

            <label>Assign this to:</label>
            <input id = "client-name-field" type ="text" onChange={(e) => setAssignedTo(e.target.value)}></input>

            <button id = "ticket-create-btn">Create a new ticket</button>
        </form>
    )
}

export default TicketCreationForm;