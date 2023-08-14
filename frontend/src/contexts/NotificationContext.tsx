import React, { createContext, useReducer } from "react";

type Message = personalMessage | groupMessage;

interface personalMessage {
  _id: string;
  senderEmail: string;
  senderName: string;
  receiverEmail: string;
  messageType: "personal";
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface groupMessage {
  _id: string;
  senderEmail: string;
  senderName: string;
  messageType: "group";
  content: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}

interface Notification {
  notifications: Message[];
}

type ActionType = {
  type: "SET_NOTIFICATION";
  payload?: any;
};

const initState = {
  notifications: [],
};

interface ContextType {
  notifications: Message[];
  notificationsDispatch: React.Dispatch<ActionType>;
}

export const NotificationContext = createContext<ContextType>({
  ...initState,
  notificationsDispatch: () => null,
});

export const reducer = (state: Notification, action: ActionType) => {
  if (action.type === "SET_NOTIFICATION") {
    return {
      notifications: action.payload,
    };
  } else {
    return state;
  }
};

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [notifications, notificationsDispatch] = useReducer(reducer, initState);

  return (
    <NotificationContext.Provider
      value={{ ...notifications, notificationsDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
