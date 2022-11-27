import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useMessageContext from "../hooks/useMessageContext"



const Chat = () => {


    const { messages, dispatch } = useMessageContext();


    useEffect(() => {
        const fetchMessage = async () =>{
            
            const loggedinUser = await localStorage.getItem("user");
            console.log(JSON.parse(loggedinUser).email)
        }

        fetchMessage();
    }, [dispatch])
    return (
        <div className="chat">
            <Navbar />
            <div className="message-display">
                {messages && messages.map((message) => { })}
            </div>
        </div>
    )
}

export default Chat;

