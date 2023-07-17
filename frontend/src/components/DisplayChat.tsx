import { useEffect, useState } from "react"
import { UserField } from "../utils/ChatTypes/UserTypes"
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import axios from "axios";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { Group } from "../utils/ChatTypes/GroupChatTypes";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";

interface DisplayChatProps {
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}

export const DisplayChat = (props: DisplayChatProps) => {

    const {selectedChat, setSelectedChat } = props;
    const { dispatch } = useDisplayMessageContext();
    const {currentUser} = useCurrentUserContext();
    const { chats, displayChatDispatch } = useDisplayChatContext();

    useEffect(() => {
        async function fetchAllChats() {
    
            if (currentUser) {
                const response = await axios.get(
                    `http://localhost:1913/api/message/getchatsbyemail/${currentUser.email}`
                );
                displayChatDispatch({type:"SET_CHAT", payload:response.data})
            }
        }
        fetchAllChats();
    }, [currentUser])

    const handleClickAll = (field: (Group | UserField)) => {
        if ("users" in field) {
            if (selectedChat && selectedChat.selected._id === field._id) {
                setSelectedChat(null);
                dispatch({ type: "CLEAR_MESSAGE" })

            }
            else
                setSelectedChat({ selected: field, chatType: "Group" });
        }
        else {
            if (selectedChat && selectedChat.selected._id === field._id) {
                setSelectedChat(null);
                dispatch({ type: "CLEAR_MESSAGE" })

            }
            else
                setSelectedChat({ selected: field, chatType: "Personal" });
        }
    }

    return (
        <div id="display-chat-main" className="w-[100%] h-[100%] flex flex-col items-center gap-1">
            
            {chats && Object.keys(chats["AllChats"]).map((key) =>

            <div className ="border flex w-[75%] h-[10%] rounded-lg border-black relative" key={chats["AllChats"][Number(key)]._id}>
                <div className="profile-picture-status-container h-[100%] maxh-h-[100%]">
                    <img alt = "" className="profile-picture-img h-[100%]" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="/> 
                    <div className="status-circle active"></div>
                </div>
                <button
                    className="chat-button-indivisual"
                    onClick={() => handleClickAll(chats["AllChats"][Number(key)])}
                    
                >
                    {"groupName" in chats["AllChats"][Number(key)] ?
                        /*@ts-ignore */
                        chats["AllChats"][Number(key)].groupName :
                        /*@ts-ignore */
                        chats["AllChats"][Number(key)].fullName}
                </button>
            </div>
            )}

        </div>
    )
}