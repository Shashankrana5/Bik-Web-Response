import { useEffect } from "react";
import useUserContext from "../hooks/useUserContext";

const UserDetails = ({user}) => {
    
    const { dispatch } = useUserContext();

    return (
        <div className="user-details">
            <h2>{user.fullName} {user.email}</h2>
        </div>
    )
}

export default UserDetails;