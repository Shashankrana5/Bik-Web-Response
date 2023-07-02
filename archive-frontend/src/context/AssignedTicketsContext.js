import { useReducer, createContext } from "react";

export const AssignedTicketsContext = createContext();

export const assignedTicketsReducer = (state, action) =>{

    switch(action.type){
        case("SET_ASSIGNED_TICKETS"):
            return {assignedTickets: action.payload}
        case("ADD_ASSIGNED_TICKETS"):
            return {assinedTickets: [action.payload, ...state.assignedTickets]}
        default:
            return state;
    }
} 

export const AssignedTicketsContextProvider = ({children}) => {

    const [state, dispatch ] = useReducer(assignedTicketsReducer, {assignedTickets: null});

    return (
    <AssignedTicketsContext.Provider value = {{...state, dispatch}}>
        {children}
    </AssignedTicketsContext.Provider>
    )
}