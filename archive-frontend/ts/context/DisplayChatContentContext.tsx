import { createContext, useReducer } from 'react';

export const DisplayChatContentContext = createContext({});

export const displayChatContentReducer = (displayChatContentState, action) => {

    switch (action.type){
        case("SET_CHAT_CONTENT"):
            return {displayChatContents: action.payload};

        case("CREATE_CHAT_CONTENT"):
        return {displayChatContents: [...displayChatContentState["displayChatContents"], action.payload]}

        default:
            return displayChatContentState;
    }
}

export const DisplayChatContentContextProvider = ({children}) => {

    const [ displayChatContentState, displayChatContentDispatch ] = useReducer(displayChatContentReducer, {displayChatContents: null});
//@ts-ignore
    return <DisplayChatContentContext.Provider value = {{...displayChatContentState, displayChatContentDispatch}}>
        {children}
    </DisplayChatContentContext.Provider>
}