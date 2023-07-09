import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getSessionData } from "../utils/getSessionData";
import { UserField } from "../utils/ChatTypes/UserTypes";
import Navbar from "../components/Navbar";

const Chat = () => {

    const [ currentUser, setCurrentUser] = useState<UserField>();

    useEffect(() => {
        const sessionCheck = async() => {
            const response = await getSessionData();
            setCurrentUser(response?.data.user);
        }
        sessionCheck();
    }, [])
    
    return(
        <div id = "chat-page">
            <Navbar currentUser={currentUser!}/>

            <ChatBox currentUser = {currentUser!}/>
        </div>
    )

}

export default Chat;