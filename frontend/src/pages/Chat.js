import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ChatDetails } from "../components/ChatDetails";
import useChatContext from "../hooks/useChatContext"
import { ChatCreation } from "../components/ChatCreation";
import ChatNavigation from "../components/ChatNavigation";
import useMessageDisplayContext from "../hooks/useDisplayMessageContext";
import DisplayMessages from "../components/DisplayMessages";
import SendMessage from "../components/SendMessage";
import GroupChatCreationForm from "../components/GroupChatCreationForm.js"
import io from "socket.io-client";
import PersonalChat from "../components/PersonalChat";



const Chat = () => {


    const [userId, setUserId] = useState("");
    const { chats, chatDispatch } = useChatContext();
    var index = 0
    const loggedinUser = localStorage.getItem("user");
    const loggedinUserEmail = JSON.parse(loggedinUser).email

    const fetchUserIdFromEmail = async(email) => {
        
        const response = await fetch("http://localhost:4000/api/users/fetchid/" + email);
        const json = await response.json();

        const returnedId = json._id;
        if (returnedId){
            setUserId(returnedId);
        }
    }

    fetchUserIdFromEmail(loggedinUserEmail);

    useEffect(() => {
        const fetchMessage = async () =>{
            
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


    return (
        <div className="chat">
            <Navbar />

            <GroupChatCreationForm user_id = {userId} loggedInUserEmail={loggedinUserEmail}/>

            <PersonalChat />
            
        </div>
    )
}

export default Chat;

