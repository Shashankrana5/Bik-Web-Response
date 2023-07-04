import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import TestLogin from "./pages/TestLogin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
 

  return (
    <div className="App">
        <BrowserRouter>
        <div className="pages">
        <Routes>
          <Route path = "/logintest" element = {<TestLogin />} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/" element = {<Home />} />
          <Route path = "/chat" element = {<Chat/>} />
        </Routes>
        </div>
        </BrowserRouter>
    </div>
  );
}

export default App;