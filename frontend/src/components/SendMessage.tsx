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
        console.log(data);
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
  const handleFocus = async () => {
    if (currentUser && selectedChat && selectedChat.chatType === "Personal") {
      await axios.put("http://localhost:1913/api/message/setread", {
        senderEmail: selectedChat.selected.email,
        receiverEmail: currentUser.email,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="h-[15%]">
      <div className="border-t-2 border-gray-200 px-3 py-3 mb-2 sm:mb-0 h -[100%]">
        <div className="relative flex">
          {/* Microphone: TODO send audio messages. Change padding left on input tag to fix aligning issues. Set it to pl-12*/}
          {/* <span className="absolute inset-y-0 flex items-center">
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-100 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        ></path>
      </svg>
    </button>
  </span> */}
          <input
            type="text"
            id="sendMessageInput"
            placeholder="Write your message!"
            autoComplete="off"
            className="w-full h-[100%] focus:outline-none focus:placeholder-gray-200 text-gray-400 placeholder-gray-400 pl-4 bg-gray-50 rounded-md py-3"
            onFocus={handleFocus}
          />
          <div className="absolute right-0 items-center px-2 py-1 inset-y-0 hidden sm:flex h-[100%]">
            <button
              type="button"
              className="sm:hidden md:block inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="sm:hidden md:block inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-100 focus:outline-none sm:hidden md:block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <button
              id="sendMessageButton"
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-orange-300 hover:bg-orange-500 focus:outline-none max-h-[95%]"
            >
              <span className="font-semibold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
