import { useContext } from "react";
import { AssignedTicketsContext } from "../context/AssignedTicketsContext";

const useAssignedTicketsContext = () => {
    const context = useContext(AssignedTicketsContext);

    if (!context){
        throw Error("useAssignedTikcetsContext must be wrapped inside AssignedTicketContextProvider")
    }
    return context;
}
export default useAssignedTicketsContext;