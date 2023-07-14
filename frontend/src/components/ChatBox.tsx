import { useState } from "react";
import { ChatNabar } from "./ChatNavbar";
import { DisplayMessage } from "./DisplayMessage";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { UserField } from "../utils/ChatTypes/UserTypes";
import SendMessage from "./SendMessage";
import { DisplayChat } from "./DisplayChat";



interface ChatBoxProps {
  currentUser: UserField;
}

const ChatBox = (props: ChatBoxProps) => {
  
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const { currentUser } = props;

  return (
    <div className="chatbox-main max-w-4xl w-[35vw]">
        <ChatNabar currentUser = {currentUser!} selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        
        <div id="display-container" className="h-[100%]">

          {(selectedChat !== null) ? 
          (<DisplayMessage  selectedChat = {selectedChat} currentUser = {currentUser} setSelectedChat ={setSelectedChat}/>) :
            (<DisplayChat currentUser={currentUser} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>)
            }
      
          
        </div>


        {(selectedChat === null)? null: 
        <SendMessage  selectedChat = {selectedChat} currentUser = {currentUser}/>
        }
    </div>
  );
};

export default ChatBox;
