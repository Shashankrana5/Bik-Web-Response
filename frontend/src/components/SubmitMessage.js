import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";

const SubmitMessage = () => {
    const {displayMessages, displayMessagesDispatch} = useDisplayMessageContext();
    const [content, setContent] = useState("")
    const loggedinUser = localStorage.getItem("user");
    const senderEmail = JSON.parse(loggedinUser).email;
    const [personalChatSocket, setPersonalChatSocket ] = useState(null);
    useEffect(() => {
        setPersonalChatSocket(io.connect("http://localhost:9000/personalchat", {
            query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
        }))
    }, [])

    useEffect(() => {
        if (personalChatSocket){
        personalChatSocket.on("receive-personal-message", data => {
            console.log(data);
        })}
    }, [personalChatSocket])



    const handleSubmit = (e) => {
        e.preventDefault();
        if (displayMessages) {
            const receiverEmail =
            
              displayMessages[0].senderEmail === senderEmail
                ? displayMessages[0].receiverEmail
                : displayMessages[0].senderEmail;
            const messageData = { receiverEmail, senderEmail, content, type: "personal" };
            personalChatSocket.emit("send-personal-message", messageData);
            displayMessagesDispatch({
              type: "CREATE_MESSAGES",
              payload: messageData,
            });
        }
    }

    return (
        <>
            <input placeholder = "type something you'd like to send" onChange={e => setContent(e.target.value)}/>
            <button type="submit" onClick = {handleSubmit}>Submit Message</button>
        </>
    )
}

export default SubmitMessage;