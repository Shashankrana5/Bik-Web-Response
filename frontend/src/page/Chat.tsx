import axios from "axios";
import { useEffect } from "react";

const Chat = () => {

    useEffect(() => {
        
        const fetchChats = async() => {
            //@ts-ignore
            // const personalMessage = await axios.get("http://localhost:1913/api/message/getmessagebyemails/brandon@xyz.com/to/shashank@xyz.com");
            // console.log(chats.data);

            //@ts-ignore
            const chats = await axios.get("http://localhost:1913/api/message/getchatsbyemail/shashank@xyz.com");
            console.log(chats);

        }
        fetchChats();
    }, [])
    return(
        <div id = "chat-page">
            this is the chat page
        </div>
    )

}

export default Chat;