const { useState } = require("react")
const { useLogin } = require("../hooks/useLogin")


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {login}  = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()

        await login(email, password);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>login</h3>
            <label>Email</label>
            <input type="email" onChange = {e => setEmail(e.target.value)}/>

            <label>Password</label>
            <input type="text" onChange={e => setPassword(e.target.value)}/>

            <button>Login</button>

        </form>
    )
}

export default Login;