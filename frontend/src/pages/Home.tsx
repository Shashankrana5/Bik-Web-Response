import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getSessionData } from "../utils/getSessionData";
import Sidebar from "../components/Sidebar";

const Home = () => {

    useEffect(() => {
        const sessionCheck = async() => {
            const response = await getSessionData();
            if(response !== undefined){
                setIsLoading(false);
            }
        }
        sessionCheck();
    }, [])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleClick = async() => {
        const sessionData = await getSessionData();
        console.log(sessionData);
    }

    return (
        <div>
            {isLoading === true ? <>This should be a blank page when the person isn't authenticated.</>: 
            <div id = "main-page-authenticated">
                <Sidebar />
                <Navbar />
                <button onClick={handleClick}>click</button>
            </div>
            }
        </div>
    )
}

export default Home;