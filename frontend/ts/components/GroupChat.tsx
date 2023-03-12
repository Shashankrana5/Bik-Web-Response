import useGroupChatContext from "../hooks/useGroupChatContext";
import GroupChatCreationgForm from "./GroupChatCreationForm"

interface GroupChatProps {

    user_id: string;
    loggedinUserEmail: string
}

const GroupChat: React.FC = (props: GroupChatProps) => {

    const { user_id, loggedinUserEmail } = props;
    const chats = useGroupChatContext()["groupChats"];
    let index:number = 0;

   return (
    <div className = "groupchat-component-container">

        <GroupChatCreationgForm user_id = {user_id} loggedInUserEmail = {loggedinUserEmail} />
        {chats && Object.keys(chats).map(e => {

            return (<div className = "indivisual-group-chat" key = {index++}>
                {chats[e].groupName}
            </div>)
        })}
    </div>
   ) 
}

export default GroupChat;