import { ChatDetails } from "./ChatDetails";

const ChatNavigation = ({chats}) => {
    var index = 0;

    const handleOpen = (e) => {
        e.preventDefault();
        console.log(e.target.textContent);
        
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