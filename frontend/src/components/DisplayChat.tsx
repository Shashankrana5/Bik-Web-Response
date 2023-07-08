import axios from "axios";
import { useEffect } from "react";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from '../utils/ChatTypes/UserTypes';

interface DisplayChatProps{
    selectedChat: SelectedChat | null;
    currentUser: User;
}

export const DisplayChat = (displayChatProps: DisplayChatProps) => {
    const {messages, dispatch} = useDisplayChatContext();
    const { currentUser, selectedChat } = displayChatProps;

    useEffect(() => {

        async function fetchChats () {

            console.log(selectedChat?.chatType)
            if (selectedChat?.chatType === "Personal"){
                const personalMessage = await axios.get(`http://localhost:1913/api/message/getmessagebyemails/${currentUser?.email}/to/${selectedChat.selected.email}`)
                const pass = {messages: personalMessage.data, chatType: "Personal", currentUser: currentUser?.email};

                dispatch({type: "SET_MESSAGE", payload: pass})
            }
            //TODO: Do i want the currentUser to be a string or do I want it to be an User object.

            else if (selectedChat?.chatType === "Group"){
                const groupMessage = await axios.get(`http://localhost:1913/api/message/getgroupmessage/${selectedChat?.selected._id}/user/${currentUser?.email}`)
                const paramsToPass = {messages: groupMessage.data, chatType: "Group", currentUser: currentUser?.email};

                dispatch({type: "SET_MESSAGE", payload: paramsToPass})
            }

        }
        fetchChats();
    }, [selectedChat]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(messages);
    }, [messages])

    //Todo: have the chats store users's name too so we can use it insstead of senderEmail.
    return(
        <div id = "chat-page">
            this is the chat page
            <div>                
                {messages && messages.map(
                    
                (chat) => 
                    <div key = {chat._id}>
                        
                        <span>{chat.senderEmail}: </span>
                        <span>{chat.content}</span>
                    </div>)}
            </div>
        </div>
    )
};
