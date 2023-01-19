import Navbar from "../components/Navbar";
import { ChatCreation } from "../components/ChatCreation";
import ChatNavigation from "../components/ChatNavigation";
import useChatContext from "../hooks/useChatContext";
import { useEffect } from "react";
import PersonalChat from "../components/PersonalChat";

const ChattingPage = () => {

    return(
        <>
            <PersonalChat />
        </>
    )

}
export default ChattingPage;