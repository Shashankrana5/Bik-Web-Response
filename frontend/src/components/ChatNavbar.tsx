import axios from "axios"
import { useEffect, useState } from "react"
import { Chat, SelectedChat } from "../utils/ChatTypes/ChatType"
import { UserField } from "../utils/ChatTypes/UserTypes";

export type ChatNavbarProps = {
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>
}

export const ChatNabar = (chatNavbarProps: (ChatNavbarProps)) => {

    //TODO: create a chat dispatch which updates the chats in the chat list.

    const [chats, setChats] = useState<Chat | null>(null);
    const { selectedChat, setSelectedChat } = chatNavbarProps;

    useEffect(() => {

        async function fetchChats(){
        const response = await axios.get("http://localhost:1913/api/message/getchatsbyemail/shashank@xyz.com");
        setChats(response.data)
        console.log(chats) 
        }
        fetchChats();

    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = (userField: UserField) => {
        console.log(userField)
        if("email" in userField){
            setSelectedChat({email: userField, chatType:"Personal"});
        }
    }

    //TODO: have chats shown from last used chat.
    return (
        <div id = "chat-navbar">
            Chats(from the navbar):
                {chats && Object.keys( chats["Personal"] ).map((key:string) => 
                    <button key = {key} onClick={() => handleClick(chats["Personal"][key])} className = "chat-button-indivisual">{chats["Personal"][key]["fullName"]}</button>
                )}
                {/* {chats && Object.keys(chats["Group"]).map(key => <button>{chats["Group"][key]["_id"]["_id"]}</button>)} */}
                {/* {chats && Object.keys(chats["Group"]).map((key:string) =>{
                    <button></button>
                })} */}
        </div>
    )
}