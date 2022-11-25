import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {signup} = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await signup(fullName, email, password)
        
    }

    return (
        <form>
            <label>Full name:</label>
            <input type = "text" onChange={(e) => setFullName(e.target.value)}/>
            <label>email address</label>
            <input type = "text" onChange={(e) => setEmail(e.target.value)} />
            <label>password</label>
            <input type = "text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Signup</button>
        </form>
    )
}

export default Signup