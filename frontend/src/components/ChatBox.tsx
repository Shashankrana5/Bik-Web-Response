import { useState } from "react";
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

  return (
    <div className="chatbox-main border-2 border-pink-400 max-w-4xl">
        <ChatNabar  currentUser = {currentUser!} selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        <DisplayChat  selectedChat = {selectedChat} currentUser = {currentUser}/>
        {(selectedChat === null)? null: 
        <SendMessage  selectedChat = {selectedChat} currentUser = {currentUser}/>
        }
    </div>
  );
};

export default ChatBox;
