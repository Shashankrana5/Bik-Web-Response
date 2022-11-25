import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () =>{

    context = useContext(AuthContext);

    if (!context){
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

     return context;
}