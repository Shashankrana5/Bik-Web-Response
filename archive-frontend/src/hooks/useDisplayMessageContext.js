import { useContext } from "react";
import { DisplayMessagesContext } from "../context/DisplayMessagesContext";

export const useDisplayMessageContext = () => {

    const context = useContext(DisplayMessagesContext);

    if (!context){
        throw Error("useDisplayMessageContext musst be inside a MessageDisplayProvider")
    }
    return context;

}
export default useDisplayMessageContext;