import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TestLogin from "./pages/TestLogin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { useState } from "react";
import { UserField } from "./utils/ChatTypes/UserTypes";

function App() {
  const [currentUser, setCurrentUser] = useState<UserField>({ _id: "user's id", email: "user's email", fullName: "fullname", role: "role" })

  return (
    <div className="App">

      <BrowserRouter>
        <div className="pages">
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Routes>
              <Route path="/logintest" element={<TestLogin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </CurrentUserContext.Provider>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;