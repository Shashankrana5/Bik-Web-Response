import { useContext } from "react"
import { TicketContext } from "../context/TicketContext"


export const useTicketContext = () =>{
    const context = useContext(TicketContext)

    if (!context){
        throw Error("useTicketContext must be inside a TicketContextProvider")
    }
    return context;
}