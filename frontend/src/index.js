import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TicketContextProvider } from "./context/TicketContext";
import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";
import { MessageContextProvider } from "./context/MessageContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <ChatContextProvider>
          <MessageContextProvider>
            <TicketContextProvider>
              <App />
            </TicketContextProvider>
          </MessageContextProvider>
        </ChatContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
