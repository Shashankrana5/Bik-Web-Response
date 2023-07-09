import { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import { getSessionData } from "../utils/getSessionData";
import { UserField } from "../utils/ChatTypes/UserTypes";

const Chat = () => {

    useEffect(() => {
        const sessionCheck = async() => {
            getSessionData();
        }
        sessionCheck();
    }, [])
    
    return(
        <div id = "chat-page">
            <ChatBox/>
        </div>
    )

}

export default Chat;