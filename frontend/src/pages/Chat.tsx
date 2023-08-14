import { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import { getSessionData } from "../utils/getSessionData";

import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import Navbar from "../components/Navbar";

const Chat = () => {
  const { setCurrentUser } = useCurrentUserContext();

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await getSessionData();
      setCurrentUser(response?.data.user);
    };
    sessionCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="chat-page" className="flex">
      <Navbar />
      {/* <Navbar currentUser={currentUser!}
            setMinimizeSidebar={setMinimizeSidebar}
            // minimizeLeftNavbar={minimizeLeftNavbar}
            // setMinimizeLeftNavbar={setMinimizeLeftNavbar}
          /> */}

      <ChatBox />
    </div>
  );
};

export default Chat;
