import { useState } from "react";
import useEmailContext from "../hooks/useEmailContext";

const SendEmail = ({ticketNumber, senderEmail, receiverEmail, subject}) => {

    const {dispatch} = useEmailContext();
    const [body, setBody] = useState("");

    const handleSubmit  = async (e) => {
        e.preventDefault()

        const response = await fetch("/api/email", {
            method: "POST",
            body: JSON.stringify({senderEmail, receiverEmail, subject, ticketNumber, body}),
            headers: {
                "Content-Type": "Application/json"
            }
        })

        const json = await response.json();
        if (response.ok){
            dispatch({type: "CREATE_EMAIL", payload: json});
        }
    }
    return(
        <div className="send-email">
        <form>
         <input placeholder="write something" onChange={e =>{
            setBody(e.target.value)
         }}/>
         <button type="submit" onClick={handleSubmit} >Submit</button>
         </form>
        </div>
    )
}

export default SendEmail;