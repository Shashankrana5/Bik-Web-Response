import { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const chatReducer = (chatState, action) => {

    switch(action.type){
        case("SET_CHAT"):
            return {chats: action.payload}
    
        default:
            return chatState;
        }

}

export const ChatContextProvider = ({children}) => {

    const [ chatState, chatDispatch ] = useReducer(chatReducer, {chats: null})

    return (
        <ChatContext.Provider value = {{...chatState, chatDispatch}}>
            {children}
        </ChatContext.Provider>
    )
}