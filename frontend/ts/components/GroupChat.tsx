import useGroupChatContext from "../hooks/useGroupChatContext";
import GroupChatCreationgForm from "./GroupChatCreationForm"
import SubmitGroupChatMessage from "./SubmitGroupChatMessage";

interface GroupChatProps {

    user_id: string;
    loggedinUserEmail: string
}

const GroupChat: React.FC = (props: GroupChatProps) => {

    const { user_id, loggedinUserEmail } = props;
    const chats = useGroupChatContext()["groupChats"];
    let index:number = 0;

    const handleOpen = (e: React.FormEvent) => {

        e.preventDefault();
        
    }


   return (
    <div className = "groupchat-component-container">

        <GroupChatCreationgForm user_id = {user_id} loggedInUserEmail = {loggedinUserEmail} />
        {chats && Object.keys(chats).map(e => {

            return (<div className = "indivisual-group-chat" key = {index++}>
                <button onClick={handleOpen}>{chats[e].groupName}</button>
            </div>)
        })}

        <SubmitGroupChatMessage />
    </div>
   ) 
}

export default GroupChat;