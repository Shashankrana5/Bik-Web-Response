import { useEffect, useState } from "react"
import { UserField } from "../utils/ChatTypes/UserTypes"
import { Chat, SelectedChat } from "../utils/ChatTypes/ChatType";
import axios from "axios";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { Group } from "../utils/ChatTypes/GroupChatTypes";

interface DisplayChatProps {
    currentUser: UserField;
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}

export const DisplayChat = (props: DisplayChatProps) => {

    const { currentUser, selectedChat, setSelectedChat } = props;
    const [chats, setChats] = useState<Chat | null>(null);
    const { dispatch } = useDisplayChatContext();

    useEffect(() => {
        async function fetchAllChats() {
    
            if (currentUser) {
                const response = await axios.get(
                    `http://localhost:1913/api/message/getchatsbyemail/${currentUser.email}`
                );
                setChats(response.data);
                console.log(response.data);
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
        <div>
            a
            {chats && Object.keys(chats["AllChats"]).map((key) =>
                <button
                    className="chat-button-indivisual"
                    onClick={() => handleClickAll(chats["AllChats"][Number(key)])}
                    key={chats["AllChats"][Number(key)]._id}
                >
                    {"groupName" in chats["AllChats"][Number(key)] ?
                        /*@ts-ignore */
                        chats["AllChats"][Number(key)].groupName :
                        /*@ts-ignore */
                        chats["AllChats"][Number(key)].fullName}
                </button>

            )}

        </div>
    )
}