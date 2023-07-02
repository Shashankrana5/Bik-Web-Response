import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const useMessageContext = () => {

    const context = useContext(MessageContext)

    if (!context){
        throw Error("useMessageContext must be wrapped inside MessageContextProvider")
    }
    return context;
}

export default useMessageContext;