import { useState } from "react";
import useGroupChatContext from "../hooks/useGroupChatContext";
import GroupChatCreationgForm from "./GroupChatCreationForm"
import SubmitGroupChatMessage from "./SubmitGroupChatMessage";
import useDisplayGroupChatMessageContext from "../hooks/useDisplayGroupChatMessageContext";
import DisplayGroupChatMessage from "./DisplayGroupChatMessage";


interface GroupChatProps {

    user_id: string;
    loggedInUserEmail: string
}


const GroupChat: React.FC = (props: GroupChatProps) => {

    const { user_id, loggedInUserEmail } = props;
    const [receiverGroupId, setReceiverGroupId] = useState<string>(null);


    const displayGroupChatMessages = useDisplayGroupChatMessageContext()["displayGroupChatMessages"];
    const displayGroupChatMessageDispatch = useDisplayGroupChatMessageContext()["displayGroupChatMessageDispatch"];

    const chats = useGroupChatContext()["groupChats"];
    let index:number = 0;

    const handleOpen = async(event: React.FormEvent, group_id:string) => {

        event.preventDefault();
        
        const response = await fetch(`http://localhost:4000/api/message/groupchat/${group_id}`);
        const json = await response.json()

        displayGroupChatMessageDispatch({type: "SET_MESSAGE", payload: json})
        setReceiverGroupId(group_id);

    }


   return (
    <div className = "groupchat-component-container">

        <GroupChatCreationgForm user_id = {user_id} loggedInUserEmail = {loggedInUserEmail} />
        {chats && Object.keys(chats).map(e => {

            return (<div className = "indivisual-group-chat" key = {index++}>
                <button onClick={event => handleOpen(event, chats[e]._id)}>{chats[e].groupName}</button>
            </div>)
        })}

        <DisplayGroupChatMessage />
        <SubmitGroupChatMessage senderEmail = {loggedInUserEmail} receiverGroupId = {receiverGroupId}/>
    </div>
   ) 
}

export default GroupChat;