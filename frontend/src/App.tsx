import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestLogin from "./pages/TestLogin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { useState } from "react";
import { UserField } from "./utils/ChatTypes/UserTypes";
import Ticket from "./pages/Ticket";
import IndivisualTicket from "./pages/IndivisualTicket";
import { FrontendPlayground } from "./pages/FrontendPlayground";
import { FrontendPlayground2 } from "./pages/FrontendPlayground2";
import { Profile } from "./pages/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState<UserField | null>(null);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Routes>
              <Route path="/logintest" element={<TestLogin />} />
              <Route path="/playground" element={<FrontendPlayground />} />
              <Route path="/playground2" element={<FrontendPlayground2 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/ticket/:ticketNumber" element={<IndivisualTicket />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </CurrentUserContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
