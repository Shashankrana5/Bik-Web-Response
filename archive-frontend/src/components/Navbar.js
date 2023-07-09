import {Link} from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

const Navbar = (props) => {

    const { logout } = useLogout();
    const { minimizeLeftNavbar, setMinimizeLeftNavbar } = props;
    const handleLogout = () => {

        logout()
    }

    const handleMinimizeLeftNavbar = () => {
        console.log("here")
        const val =  (minimizeLeftNavbar === true) ? false : true
        setMinimizeLeftNavbar(val);
    }
    return (
        <div className="navbar-main flex justify-between h-14 items-center border-b border-gray-400">
            <div className = "navbar-main-right-elements flex" onClick={handleMinimizeLeftNavbar}>
            <a className="cursor-pointer ">
                <svg className="h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 17H20M4 12H20M4 7H20" stroke="#4a4645" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </a>
            <Link to = "/" className="text-gray-700 text-lg font-semibold pl-8"><h3>Bik-Web Response</h3></Link>
            </div>
            <div className="right-items-navbar-main flex items-center justify-center h-11">
                <div className="search">
                    search |
                </div>
                <img className="h-6" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="/> 
                <div className="user-name text-sm">
                    John Doe
                </div>
                <a className = "h-8 pt-1 cursor-pointer" onClick={handleLogout}>Logout</a>
                <div className="notification">
                    | notification
                </div>
            </div>
        </div>
    )
}

export default Navbar;