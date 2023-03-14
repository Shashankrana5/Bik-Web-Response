// import { useContext } from 'react';
// import { DisplayGroupChatMessageContext } from '../context/DisplayGroupChatMessageContext';

import { useContext } from "react";
import { DisplayGroupChatMessageContext } from "../context/DisplayGroupChatMessageContext";

// const useDisplayGroupChatMessageContext = () => {

//     const context = useContext(DisplayGroupChatMessageContext);

//     if (!context){
//         throw Error("useDisplayGroupChatContext needs to be wrapped inside DisplayGroupChatContextProvider")
//     }
    
//     return context;
// }

// export default useDisplayGroupChatMessageContext;

const useDisplayGroupChatMessageContext = () => {

    const context = useContext(DisplayGroupChatMessageContext);

    if (!context){
        throw Error("useDisplayGroupChatMessageContext needs to be wrapped inside DisplayGroupChatContextProvider");
    }

    return context;
}

export default useDisplayGroupChatMessageContext;