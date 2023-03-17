"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const DisplayChatContentContext_1 = require("../context/DisplayChatContentContext");
const useDisplayChatContentContext = () => {
    const context = (0, react_1.useContext)(DisplayChatContentContext_1.DisplayChatContentContext);
    if (!context) {
        throw Error("useDisplayChatContentContext needs to be wrapped around DisplayChatContentContextProvider");
    }
    return context;
};
exports.default = useDisplayChatContentContext;
