import {Link} from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

const Navbar = () => {

    const { logout } = useLogout();

    const handleLogout = () => {

        logout()
    }
    return (
        <div className="navbar">
            <Link to = "/"><h3>Home</h3></Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;