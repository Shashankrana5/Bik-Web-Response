import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useMessageContext from "../hooks/useMessageContext"
import useChatContext from "../hooks/useChatContext"



const Chat = () => {


    const { chats, chatDispatch } = useChatContext();


    useEffect(() => {
        const fetchMessage = async () =>{
            
            const loggedinUser = await localStorage.getItem("user");
            const loggedinUserEmail = JSON.parse(loggedinUser).email
            
        }

        fetchMessage();
    }, [chatDispatch])
    return (
        <div className="chat">
            <Navbar />
            <div className="message-display">
                {chats && chats.map((message) => { })}
            </div>
        </div>
    )
}

export default Chat;

