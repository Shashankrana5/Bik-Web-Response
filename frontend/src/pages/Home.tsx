import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getSessionData } from "../utils/getSessionData";
import Sidebar from "../components/Sidebar";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
// import { TicketCreationForm } from "../components/TicketCreationForm";
import "../css/home.css"

const Home = () => {

    const { currentUser, setCurrentUser } = useCurrentUserContext();
    const [minimizeSidebar, setMinimizeSidebar ] = useState<boolean>(false);
    const [ showChat, setShowChat ] = useState<boolean>(false);

    useEffect(() => {
        const sessionCheck = async() => {
            const response = await getSessionData();
            if(response !== undefined){
                setIsLoading(false);
                setCurrentUser(response.data.user);
            }
        }
        sessionCheck();
    
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleClick = async() => {
        const sessionData = await getSessionData();
        console.log(sessionData);
    }
        return (
            <>
        {isLoading === true ? <>This should be a blank page when the person isn't authenticated.</>: 

      <div className="main-homepage-container flex h-screen w-screen">
        <Sidebar
        minimizeSidebar={minimizeSidebar} showChat = {showChat} setShowChat = {setShowChat}
        />
        <div className="nav-and-body bg-amber-50 flex-grow">
          <Navbar currentUser={currentUser!}
          setMinimizeSidebar={setMinimizeSidebar}
            // minimizeLeftNavbar={minimizeLeftNavbar}
            // setMinimizeLeftNavbar={setMinimizeLeftNavbar}
          />

          <div className="main-body">
            <div className="body flex justify-center">
              <div className="body-source w-fill ">
                <div className="ticket-creation-form-container flex flex-col ">
                  <div
                    id="ticket-creation-division"
                    className="ticket-creation-nav 
                  flex ml-auto cursor-pointer rounded-md p-2  bg-orange-100 border
                  text-gray-700 md:border-orange-200 md:border-2 hover:bg-orange-300 hover:text-white transition ease-out duration-500"
                    // onClick={handleCreateTicket}
                  >
                    <div className="">New Ticket</div>
                    <div className=" w-6 h-6 relative">
                      <button id="transform-button">
                        <span id="transform-button-stick"></span>
                        <span id="transform-button-stick"></span>
                      </button>
                    </div>
                  </div>
                  {/* <TicketCreationForm
                    // createTicket={createTicket}
                    // setCreateTicket={setCreateTicket}
                  /> */}
                </div>
                {/* <UserSearchBar /> */}
                {/* <div className="show-tickets">
                  {tickets &&
                    tickets.map((ticket) => (
                      <TicketDetails key={ticket._id} ticket={ticket} />
                    ))}
                  <div className="create-ticket"></div>
                </div> */}
                {/* <PersonalChat />
                <GroupChat /> */}
              </div>
            </div>
            {/* <HomeChat /> */}
          </div>
        </div>
      </div>
      }
      <button onClick={handleClick}>Get session data</button>
      </>
    );

}

export default Home;