import { useContext } from "react"
import { EmailContext } from "../context/EmailContext"

const useEmailContext = () => {
    const context = useContext(EmailContext);

    if (!context){
        throw Error("useEmailContext needs to be wrapped insde a EmailContextProvider")
    }
    return context;
}

export default useEmailContext;