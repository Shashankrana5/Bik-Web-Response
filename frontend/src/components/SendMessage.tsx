import axios from "axios";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { Socket } from "socket.io-client";
import { useEffect } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";

interface SendMessageProps {
  selectedChat: SelectedChat | null;
  personalChatSocket: Socket;
  groupChatSocket: Socket;
}

const SendMessage = (props: SendMessageProps) => {
  const { dispatch } = useDisplayMessageContext();
  const { currentUser } = useCurrentUserContext();
  const { selectedChat, personalChatSocket, groupChatSocket } = props;

  useEffect(() => {
    if (personalChatSocket) {
      personalChatSocket.on("receive-personal-message", (data) => {
        dispatch({ type: "CREATE_MESSAGE", payload: data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalChatSocket]);

  useEffect(() => {
    if (
      selectedChat &&
      selectedChat.selected &&
      selectedChat.chatType === "Group"
    ) {
      groupChatSocket?.emit("join-groupchat", selectedChat.selected._id);
    }
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    if (groupChatSocket) {
      groupChatSocket.on("receive-groupchat-message", (data) => {
        dispatch({ type: "CREATE_MESSAGE", payload: data });
      });
    } // eslint-disable-next-line
  }, [groupChatSocket]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //@ts-ignore
    if (e.target.sendMessageInput.value.length !== 0 && selectedChat !== null) {
      const response = await axios.post(
        `http://localhost:1913/api/message/sendmessage`,
        {
          selectedChat,
          currentUser,
          //@ts-ignore
          content: e.target.sendMessageInput.value,
        },
      );

      if (response) {
        dispatch({ type: "CREATE_MESSAGE", payload: response.data });
        if (selectedChat?.chatType === "Personal") {
          personalChatSocket?.emit("send-personal-message", response.data);
        } else if (
          selectedChat &&
          selectedChat.selected &&
          selectedChat?.chatType === "Group"
        ) {
          groupChatSocket?.emit("send-groupchat-message", response.data);
        }
      }
      /*@ts-ignore */
      e.target.sendMessageInput.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-blue-200">
      <input id="sendMessageInput" placeholder="Send message" />
      <button id="sendMessageButton" type="submit">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
