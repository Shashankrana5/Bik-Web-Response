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
            body: JSON.stringify({ receiverEmail, senderEmail, content }),
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
            <input onChange={ e => setReceiverEmail(e.target.value)} />
            <label>User you would like to chat:</label>
            <input onChange={e => setContent(e.target.value)}/>

            <label>Enter the message you'd like to send</label>

            <button onClick={handleSubmit}> submit the chat </button>
            </form>
        </div>
    )
}