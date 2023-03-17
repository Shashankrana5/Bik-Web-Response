import { createContext, useReducer } from 'react';

export const DisplayChatContentContext = createContext({});

export const displayChatContentReducer = (displayChatContentState, action) => {

    switch (action.type){
        case("SET_CHAT_CONTENT"):
            return {displayChatContents: action.payload};

        case("CREAT_CHAT_CONTENT"):
        return {displayChatContents: [...displayChatContentState["displayChatContents"], action.payload]}

        default:
            return displayChatContentState;
    }
}

export const DisplayChatContentContextProvider = ({children}) => {

    const [ displayChatContentState, displayChatContentDispatch ] = useReducer(displayChatContentReducer, {displayChatContents: null});

    return <DisplayChatContentContext.Provider value = {{...displayChatContentState, displayChatContentDispatch}}>
        {children}
    </DisplayChatContentContext.Provider>
}