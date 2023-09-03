import { useEffect, useState } from "react";
import { getSessionData } from "../utils/getSessionData";

import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { DisplayTicket } from "../components/DisplayTicket";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Ticket = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [minimizeSidebar, setMinimizeSidebar] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await getSessionData();
      setCurrentUser(response?.data.user);
      setIsLoading(false);
    };
    sessionCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <div className="flex flex-1 min-h-screen">
        <Sidebar
          minimizeSidebar={minimizeSidebar}
          showChat={showChat}
          setShowChat={setShowChat}
        />
        <div className="nav-and-body bg-amber-50 flex-grow">
          <Navbar
            currentUser={currentUser!}
            setMinimizeSidebar={setMinimizeSidebar}
          />
          <div className="main-body">
            <div className="body flex justify-center">
              <div className="body-source w-fill ">
                <DisplayTicket />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Ticket;
