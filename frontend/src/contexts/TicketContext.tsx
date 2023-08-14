import { createContext, useReducer } from "react";
import { Ticket } from "../utils/TicketTypes/Ticket";

type ActionType = {
  type: "SET_Ticket";
  payload: Ticket[] | null;
};

interface ContextType {
  tickets: Ticket[] | null;
  ticketsDispatch: React.Dispatch<ActionType>;
}

interface TicketsType {
  tickets: Ticket[] | null;
}

export const TicketContext = createContext<ContextType>({
  tickets: null,
  ticketsDispatch: () => null,
});

export const reducer = (
  state: TicketsType,
  action: ActionType,
): TicketsType => {
  if (action.payload === null) return state;
  else if (action.type === "SET_Ticket") {
    return { tickets: action.payload };
  } else return state;
};

export const TicketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [tickets, ticketsDispatch] = useReducer(reducer, { tickets: null });

  return (
    <TicketContext.Provider value={{ ...tickets, ticketsDispatch }}>
      {children}
    </TicketContext.Provider>
  );
};
