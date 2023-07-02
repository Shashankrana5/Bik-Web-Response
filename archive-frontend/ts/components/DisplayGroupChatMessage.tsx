import useDisplayGroupChatMessageContext from '../hooks/useDisplayGroupChatMessageContext';

interface DisplayGroupChatMessageProps {
    groupId: string;
    senderEmail:string;
    content: string;
}

const DisplayGroupChatMessage: React.FC = () => {

    const displayGroupChatMessages = useDisplayGroupChatMessageContext()["displayGroupChatMessages"];
    const displayGroupChatMessageDispatch = useDisplayGroupChatMessageContext()["displayGroupChatMessageDispatch"];

    return (
        
        <div className="indivisual-group-chat-message">
            {displayGroupChatMessages && displayGroupChatMessages.map(element => {
                return (
                    <div key = {element._id}>
                        {element.senderEmail + ":                             " + element.content}
                    </div>)
                    
                })}     
        </div>
    )
}

export default DisplayGroupChatMessage;