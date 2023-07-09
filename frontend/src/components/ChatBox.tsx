import { useEffect, useState } from "react";
import { ChatNabar } from "./ChatNavbar";
import { DisplayChat } from "./DisplayChat";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { UserField } from "../utils/ChatTypes/UserTypes";
import SendMessage from "./SendMessage";

interface ChatBoxProps {
  currentUser: UserField;
}

const ChatBox = (props: ChatBoxProps) => {
  
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const { currentUser } = props;
  //TODO: set current user neds to be updated when a person logs in:

    useEffect(()=>{
      // console.log(currentUser);
    // console.log(selectedChat);
  }, [selectedChat, currentUser]);
  return (
    <>
        <ChatNabar  currentUser = {currentUser!} selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        <DisplayChat  selectedChat = {selectedChat} currentUser = {currentUser}/>
        <SendMessage  selectedChat = {selectedChat} currentUser = {currentUser}/>
    </>
  );
};

export default ChatBox;
