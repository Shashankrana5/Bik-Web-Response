import { createContext, useReducer } from "react";

interface Message {

    _id: string;
    senderEmail?: string;
    receiverEmail?: string;
    messageType: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

interface DisplayChatContextType {
    type: "Personal" | "Group";
    currentUser: string;
    messages: Message[]
}

type ActionType = {
    type: "SET_MESSAGE" | "CREATE_MESSAGE";
    payload: DisplayChatContextType;
}

export const DisplayChatContext = createContext<DisplayChatContextType | null>(null);

export const displayChatReducer = (displayChatState: DisplayChatContextType, action: ActionType) => {

    switch(action.type){
        case('SET_MESSAGE'):
            return {displayChat: action.payload};
        case("CREATE_MESSAGE"):
            return {displayChat: ["Todo"]};
        default:
            return displayChatState;
    }
}

export const DisplayChatContextProvider = ({children}) => {

    const [ displayChatState, displayChatDispatch ] = useReducer(displayChatReducer, {displayChat: null});

    return <DisplayChatContext.Provider value = {{...displayChatState, displayChatDispatch}}>
    {children}
</DisplayChatContext.Provider>
}
