import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { ChatNavbar } from "./ChatNavbar";
import { DisplayMessage } from "./DisplayMessage";
import { SelectedChat } from '../utils/ChatTypes/ChatType';
import { SelectedChat } from '../utils/ChatTypes/ChatType';
import SendMessage from "./SendMessage";
import { DisplayChat } from "./DisplayChat";
import { Socket, io } from "socket.io-client";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";

const ChatBox = () => {
  
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [personalChatSocket, setPersonalChatSocket] = useState<Socket>();
  const [groupChatSocket, setGroupChatSocket] = useState<Socket>();
  const { currentUser } = useCurrentUserContext();
  const { chats } = useDisplayChatContext();
  const [ onlines, setOnlines] = useState<any>();
  useEffect(() => {
    if (currentUser) {
      setPersonalChatSocket(
        io(`http://localhost:1914/personalchat`, {
          query: { currentUser: JSON.stringify(currentUser) },
        })
      );
      setGroupChatSocket(io(`http://localhost:1914/groupchat`, {
        query: { currentUser: JSON.stringify(currentUser) },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  useEffect(() => {
    if (chats.Personal.length > 0){
      personalChatSocket?.emit("fetch-status-personal", chats.Personal);
    }
  }, [chats]);

  useEffect(() => {
    console.log(personalChatSocket)
        personalChatSocket?.on("friends-status-online", activeFriends => {
      console.log("these friends are active")
        setOnlines(activeFriends)
      console.log(activeFriends);
    })
    personalChatSocket?.on("user-status-online", onlineFriend => {
      console.log("this person is came online")
      console.log(onlineFriend);
    })

  }, [personalChatSocket, onlines, setOnlines])


  useEffect(() => {
    personalChatSocket?.on("oin", data => {
      console.log(data)
    })
  })

  return (
    <div className="chatbox-main max-w-4xl w-[35vw]">
        <ChatNavbar selectedChat={selectedChat} setSelectedChat = {setSelectedChat}/>
        
        <div id="display-container" className="h-[100%]">

          {(selectedChat !== null) ? 
          (<DisplayMessage  selectedChat = {selectedChat} setSelectedChat ={setSelectedChat}/>) :
            (<DisplayChat setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>)
            }
        </div>

        {(selectedChat === null)? null: 
        <SendMessage  selectedChat = {selectedChat} groupChatSocket={groupChatSocket!} personalChatSocket={personalChatSocket!}/>
        <SendMessage  selectedChat = {selectedChat} groupChatSocket={groupChatSocket!} personalChatSocket={personalChatSocket!}/>
        }
    </div>
  );
};

export default ChatBox;
