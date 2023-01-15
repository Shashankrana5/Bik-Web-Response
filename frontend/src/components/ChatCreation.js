import useChatContext from "../hooks/useChatContext"
import { useState } from "react";

export const ChatCreation  = () => {
    
    const { chatDispatch } = useChatContext();
    const [receiverEmail, setReceiverEmail] = useState("");
    const  senderEmail = JSON.parse(localStorage.getItem("user")).email
    const [content, setContent] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();


        const valuesToPass = { receiverEmail, senderEmail, content, };
        console.log(valuesToPass)
        const messageCreated = await fetch("/api/message/sendmessage", {
            method: "POST", 
            body: JSON.stringify({ receiverEmail, senderEmail, content, messageType: "personal" }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // const json = await messageCreated.json();

        chatDispatch({type: "CREATE_CHAT", payload: [senderEmail, receiverEmail]})
        

    }

    return (
        <div className="creation-form">
            <form>
            <label>User you would like to chat:</label>
            <input onChange={ e => setReceiverEmail(e.target.value)} />
            <label>Enter the message you'd like to send</label>
            <input onChange={e => setContent(e.target.value)}/>
            <button onClick={handleSubmit}> submit the chat </button>
            </form>
        </div>
    )
}