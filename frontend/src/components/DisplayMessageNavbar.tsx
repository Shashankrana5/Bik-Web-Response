import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from "../utils/ChatTypes/UserTypes";
import "../css/userActive.css";
import { FaAngleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

interface DisplayMessageNavbarProps {
  selectedChat: SelectedChat | null;
  currentUser: User;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}
export const DisplayMessageNavbar = (props: DisplayMessageNavbarProps) => {
  const { selectedChat, setSelectedChat } = props;
  const [avatarPicture, setAvatarPicture] = useState<string | null>(null);
  useEffect(() => {
    const fetchImage = async () => {
      if (
        selectedChat &&
        selectedChat.selected &&
        selectedChat.selected.avatarId
      ) {
        const response = await axios.get(
          "http://localhost:1913/api/image/getbyid/" +
            selectedChat.selected.avatarId,
          { responseType: "arraybuffer" },
        );
        let base64ImageString = Buffer.from(response.data, "binary").toString(
          "base64",
        );

        setAvatarPicture(base64ImageString);
      }
    };
    fetchImage();
  }, [selectedChat]);
  const handleClickBack = () => {
    setSelectedChat(null);
  };
  return (
    <div className="flex sm:items-center justify-between border-b-2 border-gray-200 h-[20%] w-[90%] p-2">
      <div className="flex gap-2 items-center h-[100%]">
        <button onClick={handleClickBack}>
          <FaAngleLeft className="h-9 w-9 text-gray-700 font-medium p-0" />
        </button>
        <div className="relative flex items-center space-x-4 h-[100%]">
          <div className="relative h-[100%]">
            {avatarPicture ? (
              <img
                src={`data:image/jpeg;base64,${avatarPicture}`}
                className="profile-picture-img h-[100%]"
                alt="user's avatar"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="user's avatar"
                // className="w-8 sm:w-16 h-8 sm:h-16 rounded-full"
                className="profile-picture-img h-[100%]"
              />
            )}

            <div className="status-circle active"></div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              {/* TODO: status and picture for group type. */}
              <span className="text-gray-700 mr-3">
                {selectedChat?.chatType === "Personal"
                  ? selectedChat?.selected.fullName
                  : null}
              </span>
            </div>
            {/* <span className="text-lg text-gray-600">Junior Developer</span> */}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
