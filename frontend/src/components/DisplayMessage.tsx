import axios from "axios";
import { useEffect } from "react";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { DisplayMessageNavbar } from "./DisplayMessageNavbar";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";

interface DisplayChatProps {
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}

export function DisplayMessage(displayChatProps: DisplayChatProps) {
    const { messages, dispatch } = useDisplayChatContext();
    const { selectedChat, setSelectedChat } = displayChatProps;
    const {currentUser} = useCurrentUserContext();

    useEffect(() => {

        async function fetchChats() {

            if (selectedChat?.chatType === "Personal") {
                const personalMessage = await axios.get(`http://localhost:1913/api/message/getmessagebyemails/${currentUser?.email}/to/${selectedChat.selected.email}`);
                const pass = { messages: personalMessage.data, chatType: "Personal", currentUser: currentUser?.email };

                dispatch({ type: "SET_MESSAGE", payload: pass });
            }


            else if (selectedChat?.chatType === "Group") {
                const groupMessage = await axios.get(`http://localhost:1913/api/message/getgroupmessage/${selectedChat?.selected._id}/user/${currentUser?.email}`);
                const paramsToPass = { messages: groupMessage.data, chatType: "Group", currentUser: currentUser?.email };

                dispatch({ type: "SET_MESSAGE", payload: paramsToPass });
            }

        }
        fetchChats();
    }, [selectedChat]); // eslint-disable-line react-hooks/exhaustive-deps
    return (

        <div id="displaymessage" className="flex justify-center max-h-64">
            <div className="">
                <DisplayMessageNavbar currentUser={currentUser} selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
                <div className="display-message-container max-w-lg max-h-[100%] overflow-y-auto flex flex-col-reverse border-2 border-yellow-700 ">
                    {messages && [...messages].reverse().map(chat => {
                        return (currentUser.email === chat.senderEmail) ?
                            <div className="flex flex-row-reverse" key = {chat._id}>
                                <div>
                                    <p className="bg-orange-200 border-2 border-orange-200 rounded-md">{chat.content}</p>
                                </div>
                            </div>
                            : (<div className="flex" key = {chat._id}>
                                <div>
                                    <p className="bg-gray-200 border-2 border-gray-200 rounded-md">{chat.content}</p>
                                </div>
                            </div>);
                    }
                    )}
                </div>
            </div>
        </div>
    );
}
