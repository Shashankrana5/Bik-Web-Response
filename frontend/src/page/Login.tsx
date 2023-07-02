import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Login page</h3>
            <label>Email</label>
            <input type="email" onChange = {e => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="text" onChange={e => setPassword(e.target.value)}/>

            <button>Login</button>

        </form>
    )
}

export default Login;