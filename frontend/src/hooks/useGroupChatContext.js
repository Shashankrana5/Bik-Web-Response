"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const GroupChatContext_1 = require("../context/GroupChatContext");
const useGroupChatContext = () => {
    const context = (0, react_1.useContext)(GroupChatContext_1.GroupChatContext);
    if (!context) {
        throw Error("useGroupChatContext needs to be wrapped inside GroupChatContextProvider");
    }
    return context;
};
exports.default = useGroupChatContext;
