import { createContext, useReducer } from 'react';

interface Message {
    groupId: string;
    senderEmail: string;
    content: string;

    // Add created at here too.
}

type ActionType = {
    type: "SET_MESSAGE" | "CREATE_MESSAGE";
    payload: Message[];
}

export const DisplayGroupChatMessageContext = createContext<Message | {}>({});

export const displayGroupChatMessageReducer = (displayGroupChatMessageState: Message[], action: ActionType) => {

    switch (action.type){
        case("SET_MESSAGE"):
            return {displayGroupChatMessages: action.payload};

        case ("CREATE_MESSAGE"):
            // console.log(displayGroupChatMessageState)
            // {displayGroupChatMessages: }
            return { displayGroupChatMessages: [...displayGroupChatMessageState["displayGroupChatMessages"], action.payload]}
        default:
            return displayGroupChatMessageState;
    }
}

export const DisplayGroupChatMessageContextProvider = ({children}) => {

    const [displayGroupChatMessageState, displayGroupChatMessageDispatch] = useReducer(displayGroupChatMessageReducer, {displayGroupChatMessages: null})

    return <DisplayGroupChatMessageContext.Provider value = {{...displayGroupChatMessageState, displayGroupChatMessageDispatch}}>
        {children}
    </DisplayGroupChatMessageContext.Provider>
}