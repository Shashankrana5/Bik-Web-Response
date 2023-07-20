import axios from "axios";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";

interface NavbarProps {
    currentUser?: UserField;
    setMinimizeSidebar?: React.Dispatch<React.SetStateAction<boolean>>

}

const Navbar = (props: NavbarProps) => {

    const { setMinimizeSidebar } = props;
    const { currentUser } = useCurrentUserContext();
    
    const handleProfileClick = async() =>{

        try{
            axios.delete(`http://localhost:1913/api/session`, {withCredentials: true,})
            window.location.href = "/login"
        }
    catch(error){
        console.log({errorMessage: error});
    }
}

const handleMinimizeLeftNavbar = () => {
    setMinimizeSidebar!((prevState: boolean) => !prevState);
}

    return (
        <div className="navbar-main flex justify-between h-14 items-center border-b border-gray-400">
            <div className = "navbar-main-right-elements flex">
            <Link to="/" className="cursor-pointer ">
                <svg className="h-8" viewBox="0 0 24 24" fill="none"  onClick={handleMinimizeLeftNavbar} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 17H20M4 12H20M4 7H20" stroke="#4a4645" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g> </svg>
            </Link>
            <Link to = "/" className="text-gray-700 text-lg font-semibold pl-8"><h3>Bik-Web Response</h3></Link>
            </div>
            <div className="right-items-navbar-main flex items-center justify-center h-11">
                <div className="search">
                    search |
                </div>
                <img alt = "" className="h-6" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="/> 
                <div className="user-name text-sm">
                    {currentUser?.fullName}
                </div>
                <Link to="/" className = "h-8 pt-1 cursor-pointer" onClick={handleProfileClick}> | Logout</Link>
                <div className="notification">
                    | notification
                </div>
                {/* <div>chat & bubble notification</div> */}
                {/* <div>settings</div> */}

            </div>
        </div>
    )
}

export default Navbar;