import axios from "axios"
import { useEffect, useState } from "react"
import { Chat, SelectedChat } from "../utils/ChatTypes/ChatType"
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Group } from "../utils/ChatTypes/GroupChatTypes";

export type ChatNavbarProps = {
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>
}

export const ChatNabar = (chatNavbarProps: (ChatNavbarProps)) => {

    //TODO: create a chat dispatch which updates the chats in the chat list.

    const [chats, setChats] = useState<Chat | null>(null);
    const { setSelectedChat } = chatNavbarProps;

    useEffect(() => {

        async function fetchChats(){
        const response = await axios.get("http://localhost:1913/api/message/getchatsbyemail/shashank@xyz.com");
        setChats(response.data)
        }
        fetchChats();

    },[setChats])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClickPersonal = (userField: UserField) => {
        setSelectedChat({selected: userField, chatType: "Personal"});    
    }
    const handleClickGroup = (groupField: Group) => {
        setSelectedChat({selected: groupField, chatType: "Group"});
    }

    return (
        <div id = "chat-navbar">
            Chats(from the navbar):
                {chats && Object.keys(chats["Personal"] ).map((key:string) => 
                    <button key = {key} onClick={() => handleClickPersonal(chats["Personal"][key])} className = "chat-button-indivisual">{chats["Personal"][key]["fullName"]}</button>
                )}
                <div>
                    groups:
                </div>
                {chats && Object.keys(chats["Group"]).map(key => <button className = "chat-button-indivisual" onClick={() => handleClickGroup(chats["Group"][key])} key = {chats["Group"][key]["_id"]}>{chats["Group"][key]["groupName"]}</button>)}
        </div>
    )
}