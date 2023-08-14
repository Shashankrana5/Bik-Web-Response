import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DisplayMessageContextProvider } from "./contexts/DisplayMessageContext";
import { DisplayChatContextProvider } from "./contexts/DisplayChatContext";
import { ActiveChatsContextProvider } from "./contexts/ActiveChatsContext";
import { TicketContextProvider } from "./contexts/TicketContext";
import { TicketContentContextProvider } from "./contexts/TicketContentContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <NotificationContextProvider>
    <ActiveChatsContextProvider>
      <DisplayChatContextProvider>
        <DisplayMessageContextProvider>
          <TicketContextProvider>
            <TicketContentContextProvider>
              <App />
            </TicketContentContextProvider>
          </TicketContextProvider>
        </DisplayMessageContextProvider>
      </DisplayChatContextProvider>
    </ActiveChatsContextProvider>
    ,
  </NotificationContextProvider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
