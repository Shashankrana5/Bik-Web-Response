import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DisplayMessageContextProvider } from "./contexts/DisplayMessageContext";
import { DisplayChatContextProvider } from "./contexts/DisplayChatContext";
import { ActiveChatsContextProvider } from "./contexts/ActiveChatsContext";
import { TicketContextProvider } from "./contexts/TicketContext";
import { TicketContentContextProvider } from "./contexts/TicketContentContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

// export const host_ip = "https://bik-web.com";
// export const chat_ip = "https://bik-web.com"
// export const host_ip = "127.0.0.1";
// export const host_ip = "localhost";

// export const chat_ip = "http://localhost:1914";
// export const host_ip = "http://localhost:1913";

export const host_ip = "https://bik-web.com";
export const chat_ip = "https://bik-web.com";

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
