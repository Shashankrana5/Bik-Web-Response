import { createContext, useReducer } from "react";
import { Chat } from "../utils/ChatTypes/ChatType";

type ActionType = {
  type: "SET_CHAT" | "CREATE_CHAT";
  payload: any;
};

interface ContextType {
  chats: Chat;
  displayChatDispatch: React.Dispatch<ActionType>;
}
interface DisplayChatType {
  chats: Chat;
}

const initialState = {
  chats: {
    Personal: [],
    Group: [],
    User: { _id: "", email: "", fullName: "", role: "" },
    AllChats: [],
  },
};

export const DisplayChatContext = createContext<ContextType>({
  ...initialState,
  displayChatDispatch: () => null,
});

export const reducer = (
  state: DisplayChatType,
  action: ActionType,
): DisplayChatType => {
  // TODO: add CREATE_CHAT action type
  switch (action.type) {
    case "SET_CHAT":
      return { chats: action.payload };

    default:
      throw state;
  }
};

export const DisplayChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [displayChatState, displayChatDispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <DisplayChatContext.Provider
      value={{ ...displayChatState, displayChatDispatch }}
    >
      {children}
    </DisplayChatContext.Provider>
  );
};
