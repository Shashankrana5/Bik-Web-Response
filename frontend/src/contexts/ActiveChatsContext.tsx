import { createContext, useReducer } from "react";


type ActionType = {
    type: 'SET_ACTIVE_CHAT',
    payload: any
}

interface ContextType {
    activeChats: Set<string> | null;
    activeChatsDispatch:  React.Dispatch<ActionType>;
}

interface ActiveChatsType {
    activeChats: Set<string>;
}

export const ActiveChatsContext = createContext<ContextType>({activeChats: null, activeChatsDispatch: () => null});

export function reducer(state: ActiveChatsType, action: ActionType) {

    switch(action.type){
        case("SET_ACTIVE_CHAT"):
            return {activeChats: action.payload};

        default:
            throw state;
    }

}

export const ActiveChatsContextProvider = ({children}: {children:React.ReactNode}): JSX.Element => {

    const [ activeChats, activeChatsDispatch ] = useReducer(reducer, {activeChats: null});

    return (
        <ActiveChatsContext.Provider value = {{...activeChats, activeChatsDispatch}}>
            {children}
        </ActiveChatsContext.Provider>
    )
}