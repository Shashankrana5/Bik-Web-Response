import { useEffect, useState } from 'react';
import { ChatNabar } from './ChatNavbar';
import { DisplayChat } from "./DisplayChat";
import { SelectedChat } from '../utils/ChatTypes/ChatType';

const ChatBox = () => {

    const [ selectedChat, setSelectedChat ] = useState<SelectedChat | null>(null);

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