import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from "../utils/ChatTypes/UserTypes";

interface DisplayMessageNavbarProps {
    selectedChat: SelectedChat | null;
    currentUser: User;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
}
export const DisplayMessageNavbar = (props: DisplayMessageNavbarProps) => {

    const { selectedChat, setSelectedChat } = props;

    const handleClickBack = () => {
        setSelectedChat(null);
    }
    return (
        <div id = "display-message-navbar" className="flex gap-2">
            <div onClick={handleClickBack} className="cursor-pointer">
                Back
            </div>
            <div>
                {selectedChat && selectedChat.selected && (("groupName" in selectedChat.selected) ? selectedChat.selected.groupName : selectedChat.selected.fullName)}
            </div>
        </div>
    )
}