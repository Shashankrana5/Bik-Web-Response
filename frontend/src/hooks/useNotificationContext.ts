import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw Error(
      "useNotificationContext needs to be wrapped around NotificationContextProvider",
    );
  }
  return context;
};
