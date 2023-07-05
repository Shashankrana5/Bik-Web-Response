import { useEffect, useState } from 'react';
import { ChatNabar, ChatNavbarProps } from './ChatNavbar';
import { DisplayChat } from "./DisplayChat";
import { SelectedChat } from '../utils/ChatTypes/ChatType';

const ChatBox = () => {

    const [ selectedChat, setSelectedChat ] = useState<SelectedChat | null>(null);

    const chatNavbarProps = {selectedChat: null} as ChatNavbarProps;
    useEffect(()=>{
        console.log(selectedChat);
    },[selectedChat])
   return (
    <>
        <ChatNabar selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        <DisplayChat />
    </>
   )

}

export default ChatBox;