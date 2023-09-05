import axios from "axios";
import { useEffect, useState } from "react";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { DisplayMessageNavbar } from "./DisplayMessageNavbar";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { Buffer } from "buffer";
import { host_ip } from "..";

interface DisplayChatProps {
  selectedChat: SelectedChat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}

export function DisplayMessage(displayChatProps: DisplayChatProps) {
  const { messages, dispatch } = useDisplayMessageContext();
  const { selectedChat, setSelectedChat } = displayChatProps;
  const { currentUser } = useCurrentUserContext();
  const [avatarPicture, setAvatarPicture] = useState<string | null>(null);
  const [selectedChatAvatarPicture, setSelectedChatAvatarPicture] = useState<
    string | null
  >(null);

  const element = document.getElementById("displaymessage-messages");
  let lastScrollTop = 0;
  if (element) {
    element.onscroll = (e) => {
      if (element.scrollTop < lastScrollTop) {
        // upscroll
        return;
      }
      lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
    };
  }
  useEffect(() => {
    async function fetchChats() {
      if (selectedChat?.chatType === "Personal") {
        const personalMessage = await axios.get(
          `http://${host_ip}:1913/api/message/getmessagebyemails/${currentUser?.email}/to/${selectedChat.selected.email}`,
        );
        const pass = {
          messages: personalMessage.data,
          chatType: "Personal",
          currentUser: currentUser?.email,
        };

        dispatch({ type: "SET_MESSAGE", payload: pass });
      } else if (selectedChat?.chatType === "Group") {
        const groupMessage = await axios.get(
          `http://${host_ip}:1913/api/message/getgroupmessage/${selectedChat?.selected._id}/user/${currentUser?.email}`,
        );
        const paramsToPass = {
          messages: groupMessage.data,
          chatType: "Group",
          currentUser: currentUser?.email,
        };

        dispatch({ type: "SET_MESSAGE", payload: paramsToPass });
      }
    }
    const fetchImage = async () => {
      if (
        selectedChat &&
        selectedChat.selected &&
        selectedChat.selected.avatarId
      ) {
        const response = await axios.get(
          `http://${host_ip}:1913/api/image/getbyid/` +
            selectedChat.selected.avatarId,
          { responseType: "arraybuffer" },
        );
        let base64ImageString = Buffer.from(response.data, "binary").toString(
          "base64",
        );

        setSelectedChatAvatarPicture(base64ImageString);
      }
      if (currentUser && currentUser.avatarId) {
        const response = await axios.get(
          `http://${host_ip}:1913/api/image/getbyid/` + currentUser.avatarId,
          { responseType: "arraybuffer" },
        );
        let base64ImageString = Buffer.from(response.data, "binary").toString(
          "base64",
        );
        setAvatarPicture(base64ImageString);
      }
    };
    fetchChats();
    fetchImage();
  }, [selectedChat]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = async (event: any) => {
    if (
      event.target.scrollTop === 0 &&
      currentUser &&
      selectedChat &&
      selectedChat.chatType === "Personal"
    ) {
      await axios.put(`http://${host_ip}:1913/api/message/setread`, {
        senderEmail: selectedChat.selected.email,
        receiverEmail: currentUser.email,
      });
    }
  };

  return (
    <div
      id="displaymessage"
      className="flex justify-center max-h-64 w-[100%] p-2"
    >
      <div className="w-[100%] flex flex-col justify-center items-center">
        <DisplayMessageNavbar
          currentUser={currentUser!}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <div
          id="displaymessage-messages"
          className="flex w-[100%] flex-col-reverse space-y-4 p-3 max-h-[70%] min-h-[45%] grow overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          onScroll={(e) => handleScroll(e)}
        >
          {messages &&
            messages
              .slice()
              .reverse()
              .map((chat) => {
                return currentUser?.email === chat.senderEmail ? (
                  <div className="chat-message w-[100%]" key={chat._id}>
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-orange-300 text-white ">
                            {chat.content}
                          </span>
                        </div>
                      </div>
                      {avatarPicture ? (
                        <img
                          alt="user's avatar"
                          src={`data:image/jpeg;base64,${avatarPicture}`}
                          className="w-6 h-6 rounded-full order-2"
                        />
                      ) : (
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                          alt="default-avatar"
                          className="w-6 h-6 rounded-full order-2"
                        />
                      )}
                      {/* <img
                      src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-2"
                    /> */}
                    </div>
                  </div>
                ) : (
                  <div className="chat-message" key={chat._id}>
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                            {chat.content}
                          </span>
                        </div>
                      </div>
                      {/* <img
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-1"
                    /> */}
                      {selectedChatAvatarPicture ? (
                        <img
                          src={`data:image/jpeg;base64,${selectedChatAvatarPicture}`}
                          className="w-6 h-6 rounded-full order-1"
                          alt="user's avatar"
                        />
                      ) : (
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                          alt="default-avatar"
                          className="w-6 h-6 rounded-full order-1"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
