"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupChatContextProvider = exports.groupChatReducer = exports.GroupChatContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.GroupChatContext = (0, react_1.createContext)({});
const groupChatReducer = (groupChatState, action) => {
    switch (action.type) {
        case ("SET_CHAT"):
            return { groupChats: action.payload };
        default:
            return groupChatState;
    }
};
exports.groupChatReducer = groupChatReducer;
const GroupChatContextProvider = ({ children }) => {
    const [groupChatState, groupChatDispatch] = (0, react_1.useReducer)(exports.groupChatReducer, { groupChats: null });
    // console.log(groupChatState)
    return (0, jsx_runtime_1.jsx)(exports.GroupChatContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, groupChatState), { groupChatDispatch }) }, { children: children }));
};
exports.GroupChatContextProvider = GroupChatContextProvider;
