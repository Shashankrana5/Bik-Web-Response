import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from "../utils/ChatTypes/UserTypes";
import "../css/userActive.css";

interface DisplayMessageNavbarProps {
  selectedChat: SelectedChat | null;
  currentUser: User;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}
export const DisplayMessageNavbar = (props: DisplayMessageNavbarProps) => {
  const { selectedChat, setSelectedChat } = props;

  const handleClickBack = () => {
    setSelectedChat(null);
  };
  return (
    <div id="display-message-navbar" className="flex h-[10%]">
      <div
        id="display-message-navbar-back"
        onClick={handleClickBack}
        className="cursor-pointer h-[100%] flex-1"
      >
        Back
      </div>
      <div className="flex display-message-navbar-right h-[100%]">
        <div className="profile-picture-status-container h-[100%] maxh-h-[100%]">
          <img
            alt=""
            className="profile-picture-img h-[100%]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
          />
          <div className="status-circle active"></div>
        </div>
        <div className=" h-[100%]">
          {selectedChat &&
            selectedChat.selected &&
            ("groupName" in selectedChat.selected
              ? selectedChat.selected.groupName
              : selectedChat.selected.fullName)}
        </div>
      </div>
      <div id="display-message-navbar-right-invisible" className="flex-1"></div>
    </div>
  );
};
