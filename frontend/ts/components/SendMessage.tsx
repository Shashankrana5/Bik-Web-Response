import { useState, useEffect } from 'react';
import * as io from "socket.io-client";

interface SendMessageProps {
    currentChat: any;
    currentLoggedinUser: string
    displayChatContentDispatch: any
    displayChatContents: any
}

const SendMessage: React.FC = (props: SendMessageProps) => {

    const currentChat = props.currentChat;
    const currentLoggedinUser = props.currentLoggedinUser;
    const [personalChatSocket, setPersonalChatSocket ] = useState(null);
    const [content, setContent] = useState("")
    const displayChatContentDispatch = props.displayChatContentDispatch;
    const displayChatContents = props.displayChatContents


    useEffect(() => {
        if (currentLoggedinUser){
        setPersonalChatSocket(io.connect("http://localhost:9000/personalchat", {
            // query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
            query: {name: currentLoggedinUser}
        }))}
    }, [currentLoggedinUser])

    useEffect(() => {
        if (personalChatSocket){
        personalChatSocket.on("receive-personal-message", data => {
            console.log(data);
            displayChatContentDispatch({type: "CREAT_CHAT_CONTENT", payload: data})
        })}
    }, [personalChatSocket])


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (displayChatContents) {
            const receiverEmail =
            
              displayChatContents[0].senderEmail === currentLoggedinUser
                ? displayChatContents[0].receiverEmail
                : displayChatContents[0].senderEmail;
            const messageData = { receiverEmail, currentLoggedinUser, content, type: "personal" };
            personalChatSocket.emit("send-personal-message", messageData);
            displayChatContentDispatch({
              type: "CREAT_CHAT_CONTENT",
              payload: messageData,
            });
            // const response = await fetch("http://localhost:4000/api/message/sendmessage", {
            //     method: "POST",
            //     body: JSON.stringify({
            //       receiverEmail: receiverEmail,
            //       senderEmail: currentLoggedinUser,
            //       content: content,
            //       messageType: "personal"
            //     }),
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   });
        }
    }

    return (
        <div className="submit-message-main">
            <form>
                <input placeholder="write something" onChange={e => setContent(e.target.value)}/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )

}

export default SendMessage;