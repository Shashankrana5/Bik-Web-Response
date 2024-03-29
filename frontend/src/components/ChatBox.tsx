import { useEffect, useState } from "react";
import { ChatNavbar } from "./ChatNavbar";
import { DisplayMessage } from "./DisplayMessage";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import SendMessage from "./SendMessage";
import { DisplayChat } from "./DisplayChat";
import { Socket, io } from "socket.io-client";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { useActiveChatsContext } from "../hooks/useActiveChatsContext";
import { host_ip } from "..";

const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [personalChatSocket, setPersonalChatSocket] = useState<Socket>();
  const [groupChatSocket, setGroupChatSocket] = useState<Socket>();
  const { currentUser } = useCurrentUserContext();
  const { chats } = useDisplayChatContext();
  const { activeChatsDispatch } = useActiveChatsContext();

  useEffect(() => {
    if (currentUser) {
      setPersonalChatSocket(
        io(`http://${host_ip}:1914/personalchat`, {
          query: { currentUser: JSON.stringify(currentUser) },
        }),
      );
      setGroupChatSocket(
        io(`http://${host_ip}:1914/groupchat`, {
          query: { currentUser: JSON.stringify(currentUser) },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (chats.Personal.length > 0) {
      personalChatSocket?.emit("fetch-status-personal", chats.Personal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  useEffect(() => {
    personalChatSocket?.on("friends-status-online", (activeFriends) => {
      activeChatsDispatch({ type: "SET_ACTIVE_CHAT", payload: activeFriends });
    });
    personalChatSocket?.on("user-status-online", (onlineFriend) => {
      activeChatsDispatch({
        type: "CREATE_ACTIVE_CHAT",
        payload: [onlineFriend],
      });
    });

    personalChatSocket?.on("friends-status-offline", (data) => {
      activeChatsDispatch({ type: "DELETE_ACTIVE_CHAT", payload: data });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalChatSocket]);

  return (
    <div className="chatbox-main max-w-4xl w-[35vw] flex flex-col py-10">
      <ChatNavbar
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      {/* <div>
          {activeChats &&
            Array.from(activeChats).map((key) => {
              return <div key = {key._id}>{key.fullName}</div>;
            })}
      </div> */}
      <div id="display-container" className="h-[85%] w-[100%]">
        {selectedChat !== null ? (
          <DisplayMessage
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        ) : (
          <DisplayChat
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        )}
      </div>

      {selectedChat === null ? null : (
        <SendMessage
          selectedChat={selectedChat}
          groupChatSocket={groupChatSocket!}
          personalChatSocket={personalChatSocket!}
        />
      )}
    </div>
  );
};

export default ChatBox;
