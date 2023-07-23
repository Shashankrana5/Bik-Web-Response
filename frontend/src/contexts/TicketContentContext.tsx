import { createContext, useReducer } from "react";
import { Ticket, TicketMessage } from "../utils/TicketTypes/Ticket"

type ActionType = {
    type: "SET_TICKET_CONTENT" | "CREATE_TICKET_CONTENT",
    payload: TicketMessage[] | TicketMessage | null
}

interface ContextType {
    ticketContent: TicketMessage[] | null;
    ticketContentDispatch: React.Dispatch<ActionType>
}

interface TicketContentType {
    ticketContent: TicketMessage[] | null;
}

export const TicketContentContext = createContext<ContextType>({ticketContent: null, ticketContentDispatch: () => null});

export const reducer = (state: TicketContentType, action: ActionType): TicketContentType => {

    if(action.payload === null)
        return state;
    
    else if (action.type === "SET_TICKET_CONTENT"){
        return {ticketContent: action.payload as TicketMessage[]};
    }
    else if (action.type === 'CREATE_TICKET_CONTENT'){
        return {ticketContent: [...state.ticketContent!, action.payload as TicketMessage]}
    }
    else
        return state;
}

export const TicketContentContextProvider = ({children}: {children:React.ReactNode}): JSX.Element => {

    const [ ticketContent, ticketContentDispatch ] = useReducer(reducer, {ticketContent: null});

    return (
        <TicketContentContext.Provider value = {{...ticketContent, ticketContentDispatch}}>
            {children}
        </TicketContentContext.Provider>
    )
}
