import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ChatDetails } from "../components/ChatDetails";
import useChatContext from "../hooks/useChatContext"



const Chat = () => {


    const { chats, chatDispatch } = useChatContext();


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
        console.log(json)
        // console.log(Object.values(json)[0])
        console.log(json["chats"])
        chatDispatch({type: "SET_CHAT", payload: json["chats"]})
    }

        fetchMessage();
    }, [chatDispatch])
    return (
        <div className="chat">
            <Navbar />
            <div className="message-display">
                {/* {console.log(chats)} */}
                {chats && Object.keys(chats).map(chat => (<ChatDetails chat = {chat}/>))}
                {/* {chats && Object.keys(Object.values(chats)).map((chat) => (<ChatDetails key = "chatings" chat = {chat}/>))} */}
                
                {/* {chats && chats.map((message) => { })} */}
            </div>
        </div>
    )
}

export default Chat;

