import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import User from "./pages/User"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat";
import Ticket from "./pages/Ticket"
import TicketHome from "./pages/TicketHome";
import { TestingChat } from "./context/TestingChat";
import ChattingPage from "./pages/ChattinPage";


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
        <Route path = "/ticket" element = {<TicketHome />}/>
        <Route path = "/ticket/:ticketNumber" element = {<Ticket/>} />
        <Route path = "/testingchat" element = {<ChattingPage/>} />
      </Routes>
      </div>
    </BrowserRouter>
  </div>;
}

export default App;
