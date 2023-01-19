import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext"

const ChatNavigation = ({chats}) => {
    var index = 0;
    const {displayMessages, displayMessagesDispatch} = useDisplayMessageContext();

    const handleOpen = async(e) => {
        e.preventDefault();
        const receiver = e.target.textContent
        const loggedinUser = localStorage.getItem("user");
        const loggedinUserEmail = await JSON.parse(loggedinUser).email
        const response = await fetch("api/message/messagesbyemail",
        {
            method: "POST",
            body: JSON.stringify({senderEmail: loggedinUserEmail,receiverEmail:receiver}),
            headers: {
                "Content-Type": "application/json"
            }
        })
       const json = await response.json();
       displayMessagesDispatch({type: 'SET_MESSAGES', payload: json})
    }
    return(                
        <div className="display-chats">
            <div className="list-chats">
                {chats&& Object.keys(chats).map(chat => <div key = {index++} className="indivisual-chat"><button onClick = {handleOpen}>{chat}</button></div>)}
            </div>
            <div className="open-chat">
                
            </div>
        </div> 
    )
}

export default ChatNavigation;