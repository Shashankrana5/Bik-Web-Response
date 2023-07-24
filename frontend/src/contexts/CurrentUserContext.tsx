import { createContext } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";

interface ContextType {
  currentUser: UserField | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserField | null>>;
}

export const CurrentUserContext = createContext<ContextType | null>(null);
