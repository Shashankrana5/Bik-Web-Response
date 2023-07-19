import { useContext } from "react"
import { ActiveChatsContext } from "../contexts/ActiveChatsContext"

export const useActiveChatsContext = () => {
    const context = useContext(ActiveChatsContext);

    if(!context){
        throw Error("useActiveChatsContext needs to be wrapped around its provider");
    }
    return context;
}