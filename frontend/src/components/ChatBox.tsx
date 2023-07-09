import { useEffect, useState } from "react";
import { ChatNabar } from "./ChatNavbar";
import { DisplayChat } from "./DisplayChat";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User, UserField } from "../utils/ChatTypes/UserTypes";
import SendMessage from "./SendMessage";


const ChatBox = () => {

  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);

  //TODO: set current user neds to be updated when a person logs in:

    const [ currentUser] = useState<User>({_id: "63c2a594b1d5914df517bb42", email: "shashank@xyz.com"})

    useEffect(()=>{
    // console.log(selectedChat);
  }, [selectedChat]);
  return (
    <>
        <ChatNabar selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        <DisplayChat selectedChat = {selectedChat} currentUser = {currentUser}/>
        <SendMessage selectedChat = {selectedChat} currentUser = {currentUser}/>
    </>
  );
};

export default ChatBox;
