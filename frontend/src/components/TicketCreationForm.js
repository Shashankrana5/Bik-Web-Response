import { useEffect, useState } from "react";
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

        const ticket = {clientName, email, subject, category, initialRequest: body , resolved, assignedTo};
        console.log(ticket)
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

    const fetchSearch = async (k, v) =>{
        if (!v) return;
        let valueToPass;
        if (k === "fullName"){
            valueToPass = {"fullName": v}
        }
        else if (k === "email"){
            valueToPass = {"email": v}
        }
        const response = await fetch("/api/users/getuser/", {
            method: "POST",
            body: JSON.stringify(valueToPass),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        })
        const json = await response.json();

        const result = json[0];
        // let fieldsSet = new Set(["email", "clientName"]);
        let fieldMap = new Object({"email": result.email, "fullName": result.fullName});

        updateCurrentField(k, fieldMap[k], v);

        delete fieldMap[k];

        for (let key of Object.keys(fieldMap)){
            changeField(key, fieldMap[key]);
        }

    }
    const changeField = (fieldName, fieldValue) => {

        let field = document.querySelector(`#${fieldName}-field`);
        field.value = fieldValue;
        
    }

    const updateCurrentField = (fieldName, fieldValue, typed) =>{
        let field = document.querySelector(`#${fieldName}-field`);
        field.value = fieldValue;
        field.setSelectionRange(typed.length, fieldValue.length)

    }
        
    
    return (
        <form id = "client-create-form" onSubmit = {handleSubmit}>
            <h3>Create a new ticket</h3>
            <label>Client name</label>
            
            <input id = "fullName-field" type ="text" onChange={(e) => {
                if (e.nativeEvent.data === null){
                    e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
                }
                setClientName(e.target.value)
                fetchSearch("fullName", e.target.value)
            }}
            ></input>

            <label>email address</label>
            <input id = "email-field" type ="text" onChange={(e) => {
                if (e.nativeEvent.data === null){
                    e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
                }
                setEmail(e.target.value)
                fetchSearch("email", e.target.value);
                }}></input>
            
            <label>subject</label>
            <input id = "subject-field" type ="text" onChange={(e) => setSubject(e.target.value)}></input>

            <label>Category</label>
            <input id = "category-field" type ="text" onChange={(e) => setCategory(e.target.value)}></input>

            <label>body</label>
            <input id = "body-field" type ="text" onChange={(e) => setBody(e.target.value)}></input>

            <label>Assign this to:</label>
            <input id = "assignment-field" type ="text" onChange={(e) => setAssignedTo(e.target.value)}></input>

            <button id = "ticket-create-btn">Create a new ticket</button>
        </form>
    )
}

export default TicketCreationForm;