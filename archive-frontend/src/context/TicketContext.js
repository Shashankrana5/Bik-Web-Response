import { createContext, useReducer } from "react";

export const TicketContext = createContext();

export const ticketReducer = (state, action) => {

    switch (action.type){
        case "SET_TICKET":
            return {tickets: action.payload}
        case("CREATE_TICKET"):
            return {tickets: [action.payload, ...state.tickets]}
        case("DELETE_TICKET"):
            return {tickets: state.tickets.filter(ticket => ticket._id !== action.payload._id)}
        default:
            return state;
    }
}

export const TicketContextProvider = ({children}) => {
    const [state, dispatch] = useReducer( ticketReducer, {tickts: null})

    return( 
        
        <TicketContext.Provider value = {{...state, dispatch}}>
            {children}
        </TicketContext.Provider>
    )

}