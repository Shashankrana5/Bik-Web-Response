import { createContext, useReducer } from "react";

export const TicketMessageContext = createContext();

export const ticketMessageReducer = (state ,action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return {messages: action.payload}
        case "CREATE_MESSAGE":
            return {messages: [action.payload, ...state.messages]}
        default:
            return state
    }
}
export const TicketMessageContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ticketMessageReducer, {messages: null});

    return(
        <TicketMessageContext.Provider value = {{...state, dispatch}}>
            {children}
        </TicketMessageContext.Provider>
    )
}