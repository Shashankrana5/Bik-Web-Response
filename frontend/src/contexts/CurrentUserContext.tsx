import { createContext } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";

interface ContextType { 
    currentUser: UserField; 
    setCurrentUser: React.Dispatch<React.SetStateAction<UserField>>; 
}

export const CurrentUserContext = createContext<ContextType | null>(null);