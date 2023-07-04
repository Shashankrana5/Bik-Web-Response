import axios from "axios";
import { useEffect } from "react";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";

const Chat = () => {

   //@ts-ignore
    const {messages, dispatch} = useDisplayChatContext();
    const a= useDisplayChatContext();
    
    console.log(a)
    useEffect(() => {
        // console.log()
        const fetchChats = async() => {
        
            //@ts-ignore
            let personalMessage = await axios.get("http://localhost:1913/api/message/getmessagebyemails/brandon@xyz.com/to/shashank@xyz.com");
            // let pass = {messages: personalMessage.data, type: "Personal", currentUser: "shashank@xyz.com"}
            let pass = {messages: personalMessage};
            console.log(pass);
            // console.log(personalMessage.data);
            console.log(messages)
            dispatch({type: "SET_MESSAGE", payload: pass})
            console.log(messages)
            // console.log(context);
            //@ts-ignore
            // const chats = await axios.get("http://localhost:1913/api/message/getchatsbyemail/shashank@xyz.com");
            // console.log(chats);

        }
        fetchChats();
    }, [])
    return(
        <div id = "chat-page">
            this is the chat page
            <div>
                {console.log("here")}
                {console.log(messages)}
                
                {messages && messages.map(
                (chat:any) => <div>{chat.content}</div>)}
            </div>
        </div>
    )

}

export default Chat;