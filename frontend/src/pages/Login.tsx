import axios from "axios"
import { UserField } from "../utils/ChatTypes/UserTypes";


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
            const response = await axios.post("http://localhost:1913/api/session", {email, password}, {withCredentials: true});
            if(response.status === 200){
                // setCurrentUser(response.data.user);
                console.log(response.data)
                // console.log(currentUser);
            }
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