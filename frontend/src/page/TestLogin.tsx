import { useState } from "react";
import axios from "axios";
import "../App.css";

const TestLogin =  () => {
  const [loginData, setLoginData] = useState();
  const [sessionData, setSessionData] = useState();
  const [logoutData, setLogoutData] = useState();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
   
    axios
      .post(
        `http://localhost:1913/api/session`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {console.log(res.data); setLoginData(res.data)})
      .catch((error) => setLoginData(error.message));
  }

  async function getSessionData() {
    axios
      .get(`http://localhost:1913/api/session`, {
        withCredentials: true,
      })
      .then((res) => setSessionData(res.data))
      .catch((error) => setSessionData(error.message));
  }

  async function logout() {
    axios
      .delete(`http://localhost:1913/api/session`, {
        withCredentials: true,
      })
      .then((res) => setLogoutData(res.data))
      .catch((error) => setLogoutData(error.message));
  }



    return(
      <div>
        <div className="wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="jane.doe@example.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="******" />

          <button type="submit">Login</button>
        </form>

        <div className="data">{JSON.stringify(loginData)}</div>
      </div>

      <div className="wrapper">
        <h2>Session</h2>
        <button onClick={getSessionData}>Get session data</button>

        <div className="data">{JSON.stringify(sessionData, null, 4)}</div>
      </div>

      <div className="wrapper">
        <h2>Logout</h2>
        <button onClick={logout}>Logout</button>

        <div className="data">{JSON.stringify(logoutData, null, 4)}</div>
      </div>
      </div>
    )
   
}

export default TestLogin;
// const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
//     return 
//     (<div>{message}</div>)
//   );

// Declaring type of props - see "Typing Component Props" for more examples
// type AppProps = {
//     message: string;
//   }; /* use `interface` if exporting so that consumers can extend */
  
//   // Easiest way to declare a Function Component; return type is inferred.
//   const App = ({ message }: AppProps) => 
//   <div>{message}</div>;
  
//   // you can choose annotate the return type so an error is raised if you accidentally return some other type
//   const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;
  
//   // you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
//   const App