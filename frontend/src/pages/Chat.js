import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { ChatDetails } from "../components/ChatDetails";
import useChatContext from "../hooks/useChatContext"
import { ChatCreation } from "../components/ChatCreation";
import ChatNavigation from "../components/ChatNavigation";
import useMessageDisplayContext from "../hooks/useDisplayMessageContext";
import DisplayMessages from "../components/DisplayMessages";
import SendMessage from "../components/SendMessage";
import io from "socket.io-client";
import PersonalChat from "../components/PersonalChat";



const Chat = () => {


    const { chats, chatDispatch } = useChatContext();
    var index = 0

    useEffect(() => {
        const fetchMessage = async () =>{
            
            const loggedinUser = await localStorage.getItem("user");
            const loggedinUserEmail = await JSON.parse(loggedinUser).email
            const usersChatted = await fetch("/api/message/chatsemail", {
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
            <PersonalChat />
        </div>
    )
}

export default Chat;

