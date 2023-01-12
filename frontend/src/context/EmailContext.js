import { useReducer, createContext } from "react";

export const EmailContext = createContext();

export const emailReducer = (state, action) => {

    switch(action.type){
        case("SET_EMAILS"):
            return {emails: action.payload};
        case("CREATE_EMAIL"):
            return {emails: [...state.emails, action.payload]};
        default:
            return state;
    }
}   

export const EmailContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(emailReducer, {emails: null});

    return(
    <EmailContext.Provider value = {{...state, dispatch}}>
    {children}
    </EmailContext.Provider>
    )
}