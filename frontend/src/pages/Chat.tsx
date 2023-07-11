import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getSessionData } from "../utils/getSessionData";
import { UserField } from "../utils/ChatTypes/UserTypes";

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
        <div id = "chat-page" className="flex">
            {/* <Navbar currentUser={currentUser!}
            setMinimizeSidebar={setMinimizeSidebar}
            // minimizeLeftNavbar={minimizeLeftNavbar}
            // setMinimizeLeftNavbar={setMinimizeLeftNavbar}
          /> */}

            <ChatBox currentUser = {currentUser!}/>
        </div>
    )

}

export default Chat;