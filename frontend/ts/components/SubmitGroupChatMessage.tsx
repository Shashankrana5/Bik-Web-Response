import { useState } from 'react';
import useDisplayGroupChatMessageContext from '../hooks/useDisplayGroupChatMessageContext';
interface SubmitGroupChatMessageProps {
    receiverGroupId: string;
    senderEmail: string;
}

const SubmitGroupChatMessage: React.FC<SubmitGroupChatMessageProps> = (props: SubmitGroupChatMessageProps) => {

    const { receiverGroupId, senderEmail } = props;
    const [ content, setContent ] = useState<string>("");
    const displayGroupChatMessageDispatch = useDisplayGroupChatMessageContext()["displayGroupChatMessageDispatch"];

    const handleSend = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            if (receiverGroupId && content){
                const response = await fetch("http://localhost:4000/api/message/sendmessage",{
                    method: "POST",
                    body: JSON.stringify({content, senderEmail, groupId: receiverGroupId}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const json = await response.json()
                displayGroupChatMessageDispatch({type: "CREATE_MESSAGE", payload: json})
    }
    }catch(err){
        throw Error(err);
    }
    }

    return (
        <div className = "group-chat-message-submit">
            <form className = "message">
                <input placeholder = "Group chat message goes here" onChange={e => setContent(e.target.value)}/>
                <button onClick = {handleSend}>Submit message</button>
            </form>
        </div>
    )
}

export default SubmitGroupChatMessage;