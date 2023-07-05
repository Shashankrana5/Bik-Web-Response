import axios from "axios";
import { useEffect } from "react";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";

export const DisplayChat = () => {
    const {messages, dispatch} = useDisplayChatContext();
    
    useEffect(() => {

        async function fetchChats () {

            const personalMessage = await axios.get("http://localhost:1913/api/message/getmessagebyemails/brandon@xyz.com/to/shashank@xyz.com");
            const pass = {messages: personalMessage, chatType: "Personal", currentUser: "shashank@xyz.com"};
            //TODO: Do i want the currentUser to be a string or do I want it to be an User object.

            dispatch({type: "SET_MESSAGE", payload: pass})

        }
        fetchChats();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div id = "chat-page">
            this is the chat page
            <div>                
                {messages && messages.map(
                (chat:any) => <div key = {chat._id}>{chat.content}</div>)}
            </div>
        </div>
    )
};
