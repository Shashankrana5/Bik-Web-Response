import axios from "axios";
import { useEffect, useState } from "react";
import { Chat, SelectedChat } from "../utils/ChatTypes/ChatType";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Group } from "../utils/ChatTypes/GroupChatTypes";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import "../css/userActive.css";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { host_ip } from "..";

export type ChatNavbarProps = {
  selectedChat: SelectedChat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
};

export const ChatNavbar = (chatNavbarProps: ChatNavbarProps) => {
  //TODO: create a chat dispatch which updates the chats in the chat list.

  const [chats, setChats] = useState<Chat | null>(null);
  const { selectedChat, setSelectedChat } = chatNavbarProps;
  const { dispatch } = useDisplayMessageContext();
  const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    async function fetchChats() {
      if (currentUser) {
        const response = await axios.get(
          `http://${host_ip}:1913/api/message/getchatsbyemail/${currentUser.email}`,
        );
        setChats(response.data);
      }
    }
    fetchChats();
  }, [setChats, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickPersonal = (userField: UserField) => {
    if (
      selectedChat &&
      selectedChat.chatType === "Personal" &&
      selectedChat.selected.email === userField.email
    ) {
      setSelectedChat(null);
      dispatch({ type: "CLEAR_MESSAGE" });
    } else setSelectedChat({ selected: userField, chatType: "Personal" });
  };
  const handleClickGroup = (groupField: Group) => {
    if (
      selectedChat &&
      selectedChat.chatType === "Group" &&
      selectedChat.selected._id === groupField._id
    ) {
      setSelectedChat(null);
      dispatch({ type: "CLEAR_MESSAGE" });
    } else setSelectedChat({ selected: groupField, chatType: "Group" });
  };
  const handleClickAll = (field: Group | UserField) => {
    if ("users" in field) {
      if (selectedChat && selectedChat.selected._id === field._id) {
        setSelectedChat(null);
        dispatch({ type: "CLEAR_MESSAGE" });
      } else setSelectedChat({ selected: field, chatType: "Group" });
    } else {
      if (selectedChat && selectedChat.selected._id === field._id) {
        setSelectedChat(null);
        dispatch({ type: "CLEAR_MESSAGE" });
      } else setSelectedChat({ selected: field, chatType: "Personal" });
    }
  };

  return (
    // <div id="chat-navbar" className="sm:hidden md:block w-[100%]">
    <div id="chat-navbar" className="hidden">
      Chats(from the navbar):
      {chats &&
        Object.keys(chats["Personal"]).map((key: string) => (
          <button
            key={key}
            onClick={() => handleClickPersonal(chats["Personal"][Number(key)])}
            className="chat-button-indivisual"
          >
            {chats["Personal"][Number(key)]["fullName"]}
          </button>
        ))}
      <div>groups:</div>
      {chats &&
        Object.keys(chats["Group"]).map((key) => (
          <button
            className="chat-button-indivisual"
            onClick={() => handleClickGroup(chats["Group"][Number(key)])}
            key={chats["Group"][Number(key)]["_id"]}
          >
            {chats["Group"][Number(key)]["groupName"]}
          </button>
        ))}
      <div>All:</div>
      {chats &&
        Object.keys(chats["AllChats"]).map((key) => (
          <button
            className="chat-button-indivisual"
            onClick={() => handleClickAll(chats["AllChats"][Number(key)])}
            key={chats["AllChats"][Number(key)]._id}
          >
            {"groupName" in chats["AllChats"][Number(key)]
              ? /*@ts-ignore */
                chats["AllChats"][Number(key)].groupName
              : /*@ts-ignore */
                chats["AllChats"][Number(key)].fullName}
          </button>
        ))}
    </div>
  );
};
