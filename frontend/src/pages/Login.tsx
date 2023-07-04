import axios from "axios"

const Login = () => {
  
    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const target = e.target as typeof e.target & {
            email: { value :string};
            password: {value: string};
        };

        //@ts-ignore
        const email = target.loginEmailField.value;

        //@ts-ignore
        const password = target.loginPasswordField.value;

        try{
            await axios.post("http://localhost:1913/api/session", {email, password}, {withCredentials: true});

        }catch(error){
            console.log({errorMessage: error});
        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Login page</h3>
            <label>Email</label>
            <input id= "loginEmailField" type="email"/>
            <label>Password</label>
            <input id = "loginPasswordField" type="text"/>

            <button>Login</button>

        </form>
    )
}

export default Login;