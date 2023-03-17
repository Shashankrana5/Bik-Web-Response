"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ChatsContext_1 = require("../context/ChatsContext");
const useChatsContext = () => {
    const context = (0, react_1.useContext)(ChatsContext_1.ChatsContext);
    if (!context) {
        throw Error("useChatsContext needs to be wrapped inside ChatsContextProvider");
    }
    return context;
};
exports.default = useChatsContext;
