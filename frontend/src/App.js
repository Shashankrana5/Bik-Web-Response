import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import User from "./pages/User"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat";
import Ticket from "./pages/Ticket"
import { TestingChat } from "./context/TestingChat";


function App() {
  return <div className="App">
    <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path = "/" element = { <Home/> }/>
        <Route path = "/users" element = { <User />} />
        <Route path = "/login" element = { <Login/>}/>
        <Route path = "/signup" element = { <Signup/>}/>
        <Route path = "/chat" element = {<Chat/>}/>
        <Route path = "/testing" element = {<TestingChat/>} />
        <Route path = "/ticket" element = {<Ticket />}/>
      </Routes>
      </div>
    </BrowserRouter>
  </div>;
}

export default App;
