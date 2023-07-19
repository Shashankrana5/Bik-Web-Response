import { createContext, useReducer } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";


type ActionType = {
    type: 'SET_ACTIVE_CHAT' | "CREATE_ACTIVE_CHAT" | "DELETE_ACTIVE_CHAT",
    payload: UserField[] | UserField | null;
}

interface ContextType {
    activeChats: UserField[] | null;
    activeChatsDispatch:  React.Dispatch<ActionType>;
}

interface ActiveChatsType {
    activeChats: UserField[] | null;
}

export const ActiveChatsContext = createContext<ContextType>({activeChats: null, activeChatsDispatch: () => null});

export function reducer(state: ActiveChatsType, action: ActionType): ActiveChatsType {
    if(action.payload === null)
        return state;
    
    switch(action.type){
        case("SET_ACTIVE_CHAT"):
            return {activeChats: action.payload as UserField[]};
        case("CREATE_ACTIVE_CHAT"):
            return ({activeChats: [...state.activeChats!, ...action.payload as UserField[]]});
        case("DELETE_ACTIVE_CHAT"):
            const disconntectedUser: UserField = action.payload as UserField;
            return ({activeChats: [...state.activeChats!].filter((item: UserField) => item._id !== disconntectedUser._id)});
            
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