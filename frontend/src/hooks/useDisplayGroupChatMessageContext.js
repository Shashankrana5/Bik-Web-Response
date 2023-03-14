"use strict";
// import { useContext } from 'react';
// import { DisplayGroupChatMessageContext } from '../context/DisplayGroupChatMessageContext';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const DisplayGroupChatMessageContext_1 = require("../context/DisplayGroupChatMessageContext");
// const useDisplayGroupChatMessageContext = () => {
//     const context = useContext(DisplayGroupChatMessageContext);
//     if (!context){
//         throw Error("useDisplayGroupChatContext needs to be wrapped inside DisplayGroupChatContextProvider")
//     }
//     return context;
// }
// export default useDisplayGroupChatMessageContext;
const useDisplayGroupChatMessageContext = () => {
    const context = (0, react_1.useContext)(DisplayGroupChatMessageContext_1.DisplayGroupChatMessageContext);
    if (!context) {
        throw Error("useDisplayGroupChatMessageContext needs to be wrapped inside DisplayGroupChatContextProvider");
    }
    return context;
};
exports.default = useDisplayGroupChatMessageContext;
