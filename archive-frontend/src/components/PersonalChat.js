import { useEffect } from "react";
import io from "socket.io-client";
import useChatContext from "../hooks/useChatContext";
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";
import { ChatCreation } from "./ChatCreation";
import ChatNavigation from "./ChatNavigation";
import DisplayMessages from "./DisplayMessages";
import Navbar from "./Navbar";
import SubmitMessage from "./SubmitMessage";



const PersonalChat = () => {

    const { chats, chatDispatch } = useChatContext();
    const {displayMessages, displayMessagesDispatch} = useDisplayMessageContext();

    var index = 0

    useEffect(() => {
        const fetchMessage = async () =>{
            
            const loggedinUser = localStorage.getItem("user");
            const loggedinUserEmail = await JSON.parse(loggedinUser).email
            const usersChatted = await fetch("http://localhost:4000/api/message/chatsemail", {
                method: "POST",
                body: JSON.stringify({email: loggedinUserEmail}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const json = await usersChatted.json();


        chatDispatch({type: "SET_CHAT", payload: json["chats"]})
    }

        fetchMessage();
    }, [chatDispatch])


    const handleOpen = async(e) => {
        e.preventDefault();
        const receiver = e.target.textContent
        const loggedinUser = localStorage.getItem("user");
        const loggedinUserEmail = await JSON.parse(loggedinUser).email
        const response = await fetch("http://localhost:4000/api/message/messagesbyemail",
        {
            method: "POST",
            body: JSON.stringify({senderEmail: loggedinUserEmail,receiverEmail:receiver}),
            headers: {
                "Content-Type": "application/json"
            }
        })
       const json = await response.json();

       displayMessagesDispatch({type: 'SET_MESSAGES', payload: json})
    }



    return (

        <>
           {/* <ChatCreation /> */}
             <ChatNavigation chats = {chats}/>
          <div className="list-chats">
                {chats&& Object.keys(chats).map(chat => <div key = {index++} className="indivisual-chat"><button onClick = {handleOpen}>{chat}</button></div>)}
            </div> 
            <DisplayMessages />
            <SubmitMessage />
        </>
    )
}

export default PersonalChat