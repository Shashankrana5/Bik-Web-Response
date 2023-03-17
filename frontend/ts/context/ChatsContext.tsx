import { createContext, useReducer } from 'react';


export const ChatsContext = createContext({});

export const chatsReducer = (chatsState, action) => {

    switch(action.type){

        case("SET_CHAT"):
            return {chats: action.payload}
        
        default:
        return chatsState;
    }
}

export const ChatsContextProvider = ({children}) => {

    const [ chatsState, chatsDispatch ] = useReducer(chatsReducer, {chats: null})

    return <ChatsContext.Provider value = {{...chatsState, chatsDispatch}}>
        {children}
    </ChatsContext.Provider>
}
