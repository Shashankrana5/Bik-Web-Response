import { useState } from "react";
import { ChatNabar } from "./ChatNavbar";
import { DisplayMessage } from "./DisplayMessage";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import SendMessage from "./SendMessage";
import { DisplayChat } from "./DisplayChat";

const ChatBox = () => {
  
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);

  return (
    <div className="chatbox-main max-w-4xl w-[35vw]">
        <ChatNabar selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        
        <div id="display-container" className="h-[100%]">

          {(selectedChat !== null) ? 
          (<DisplayMessage  selectedChat = {selectedChat} setSelectedChat ={setSelectedChat}/>) :
            (<DisplayChat setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>)
            }
      
          
        </div>


        {(selectedChat === null)? null: 
        <SendMessage  selectedChat = {selectedChat}/>
        }
    </div>
  );
};

export default ChatBox;
