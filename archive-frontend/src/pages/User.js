import { useEffect } from "react";
import UserDetails from "../components/UserDetails";
import useUserContext from "../hooks/useUserContext";

const User = () => {
    
    const {users, dispatch } = useUserContext();

    useEffect(() => {
        const fetchUsers = async() => {

            const response = await fetch("/api/users/getall");
            const json = await response.json()

            dispatch({type: "SET_USERS", payload: json})

        }
        fetchUsers()
    }, [dispatch])

    return (
        <div className="user-page">
            <h2>User page!</h2>
            {users && users.map((user) => (
                <UserDetails key = {user._id} user = {user} />
            ))}
        </div>
    )
}

export default User;