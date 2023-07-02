import { TicketMessageContext } from "../context/TicketContext";
import { useContext } from "react";
const useTicketMessageContext = () => {
    const context = useContext(TicketMessageContext);

    if (!context){
        throw Error("useTicketMessageContext must be wrapped inside TicketMessagesContextProvider")
    
    }
    return context;
}

export default useTicketMessageContext;