import useDisplayChatContentContext from "../hooks/useDisplayChatContentContext"

interface DisplayChatContextProps {

    personalChat?: boolean;
}
const DisplayChatContent = (props: DisplayChatContextProps) => {

    const personalChat = props.personalChat;
    const context = useDisplayChatContentContext();
    const displayChatContents = context["displayChatContents"]
    const displayChatContentDispatch = context["displayChatContentDispatch"]
    
    if (personalChat){
    return (
        <div>
            {displayChatContents && displayChatContents.map(d => (<div className="indivisual-personal-chat">{d.content} {d.senderName}{console.log(d)}</div>))}
        </div>
    )}
    else{
        return(
            <div>
                {displayChatContents && displayChatContents.map(d => (<div className="indivisual-personal-chat">{d.content} {d.senderName}{console.log(d)}</div>))}

            </div>
        )
    }
}

export default DisplayChatContent;