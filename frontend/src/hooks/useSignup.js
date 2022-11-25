import { useAuthContext } from "./useAuthContext"


export const useSignup = () =>{
    const {dispatch} = useAuthContext();

    const signup = async(fullName, email, password) => {
        const response = await fetch("/api/users/signup", 
        {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, email, password})
        })

        const json = await response.json()

        console.log(json);

        localStorage.setItem("user", JSON.stringify(json))
        dispatch({type: "LOGIN", payload: json})

    }

    return {signup}
}