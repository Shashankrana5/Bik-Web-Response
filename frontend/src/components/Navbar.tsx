import axios from "axios";
import { UserField } from "../utils/ChatTypes/UserTypes";

interface NavbarProps {
    currentUser: UserField;
}


const Navbar = (props: NavbarProps) => {

    const { currentUser } = props;
    const handleProfileClick = async() =>{

        try{
            axios.delete(`http://localhost:1913/api/session`, {withCredentials: true,})
            window.location.href = "/login"
        }
    catch(error){
        console.log({errorMessage: error});
    }
}
    return(
        <div id = "navbar-main">
            <div id="navbar-profile" onClick={handleProfileClick}>
                {/* TODO: need to make the div have different cursor */}
                Logout(icon & {currentUser?.fullName})
            </div>
            <div>settings</div>
            <div>chat & bubble notification</div>
            <div>notification</div>
        </div>
    )
}

export default Navbar;