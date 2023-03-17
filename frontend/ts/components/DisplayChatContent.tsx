import useDisplayChatContentContext from "../hooks/useDisplayChatContentContext"


const DisplayChatContent: React.FC = () => {

    const context = useDisplayChatContentContext();
    const displayChatContents = context["displayChatContents"]
    const displayChatContentDispatch = context["displayChatContentDispatch"]
 
    return (
        <div>
            {displayChatContents && displayChatContents.map(d => (<div className="indivisual-personal-chat">{d.content} {d.senderEmail}</div>))}
        </div>
    )
}

export default DisplayChatContent;