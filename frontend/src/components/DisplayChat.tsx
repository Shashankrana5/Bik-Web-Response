import { useEffect, useState } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import axios from "axios";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { Group } from "../utils/ChatTypes/GroupChatTypes";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { useActiveChatsContext } from "../hooks/useActiveChatsContext";
import { Buffer } from "buffer";
import "../css/userActive.css";
import { host_ip } from "..";

interface DisplayChatProps {
  selectedChat: SelectedChat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}

export const DisplayChat = (props: DisplayChatProps) => {
  const { selectedChat, setSelectedChat } = props;
  const { dispatch } = useDisplayMessageContext();
  const { currentUser } = useCurrentUserContext();
  const { chats, displayChatDispatch } = useDisplayChatContext();
  const { activeChats } = useActiveChatsContext();
  const [avatarPictures, setAvatarPictures] = useState<string[] | null>(
    new Array<string>(100).fill(""),
  );

  useEffect(() => {
    async function fetchAllChats() {
      if (currentUser) {
        const response = await axios.get(
          `${host_ip}/api/message/getchatsbyemail/${currentUser.email}`,
        );
        displayChatDispatch({ type: "SET_CHAT", payload: response.data });
      }
    }

    fetchAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    const fetchImages = async () => {
      if (chats && chats["AllChats"]) {
        for (const index in chats["AllChats"]) {
          if (
            chats["AllChats"][index].avatarId &&
            avatarPictures &&
            avatarPictures[index] === ""
          ) {
            const response = await axios.get(
              `${host_ip}/api/image/getbyid/` +
                chats["AllChats"][index].avatarId,
              { responseType: "arraybuffer" },
            );
            let base64ImageString = Buffer.from(
              response.data,
              "binary",
            ).toString("base64");
            setArray(index, base64ImageString);
          }
        }
      }
    };
    fetchImages();
  }, [chats, avatarPictures]);

  const handleClickAll = (field: Group | UserField) => {
    if ("users" in field) {
      if (selectedChat && selectedChat.selected._id === field._id) {
        setSelectedChat(null);
        dispatch({ type: "CLEAR_MESSAGE" });
      } else setSelectedChat({ selected: field, chatType: "Group" });
    } else {
      if (selectedChat && selectedChat.selected._id === field._id) {
        setSelectedChat(null);
        dispatch({ type: "CLEAR_MESSAGE" });
      } else setSelectedChat({ selected: field, chatType: "Personal" });
    }
  };

  const setArray = (index: any, value: string) => {
    if (avatarPictures) {
      const newImagesLoaded = [...avatarPictures];
      newImagesLoaded[index] = value;
      setAvatarPictures(newImagesLoaded);
    }
  };

  return (
    <div
      id="display-chat-main"
      className="w-[100%] h-[100%] flex flex-col items-center gap-1"
    >
      {chats &&
        Object.keys(chats["AllChats"]).map((key, index) => {
          return (
            <div
              id="display-chat-allchats"
              className="flex w-[75%] h-[4vh] rounded-lg bg-white relative items-center cursor-pointer"
              key={chats["AllChats"][Number(key)]._id}
              onClick={() => handleClickAll(chats["AllChats"][Number(key)])}
            >
              <div className="profile-picture-status-container h-[100%] maxh-h-[100%] flex items-center ml-3 ">
                {chats["AllChats"][index].avatarId ? (
                  avatarPictures && avatarPictures[index] !== "" ? (
                    <img
                      src={`data:image/jpeg;base64,${avatarPictures[index]}`}
                      // className="h-[100%] rounded-full shadow-lg max-h-[100%]"
                      className="avatar"
                      alt="user's avatar"
                    />
                  ) : (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                      // className="h-[100%] rounded-full shadow-lg"z
                      className="avatar"
                      alt="Avatar"
                    />
                  )
                ) : (
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                    // className="h-[100%] rounded-full shadow-lg"
                    className="avatar"
                    alt="Avatar"
                  />
                )}
                {activeChats &&
                  activeChats
                    .filter(
                      (item) => item._id === chats["AllChats"][Number(key)]._id,
                    )
                    .map((activeUser: UserField) => {
                      return (
                        <div
                          key={activeUser._id}
                          className="status-circle active"
                        ></div>
                      );
                    })}
              </div>
              <div
                className="chat-button-indivisual"
                onClick={() => handleClickAll(chats["AllChats"][Number(key)])}
              >
                {"groupName" in chats["AllChats"][Number(key)]
                  ? /*@ts-ignore */
                    chats["AllChats"][Number(key)].groupName
                  : /*@ts-ignore */
                    chats["AllChats"][Number(key)].fullName}
              </div>
            </div>
          );
        })}
    </div>
  );
};
