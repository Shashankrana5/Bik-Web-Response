"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayGroupChatMessageContextProvider = exports.displayGroupChatMessageReducer = exports.DisplayGroupChatMessageContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.DisplayGroupChatMessageContext = (0, react_1.createContext)({});
const displayGroupChatMessageReducer = (displayGroupChatMessageState, action) => {
    switch (action.type) {
        case ("SET_CHAT"):
            return { displayGroupChatMessages: action.payload };
        default:
            return displayGroupChatMessageState;
    }
};
exports.displayGroupChatMessageReducer = displayGroupChatMessageReducer;
const DisplayGroupChatMessageContextProvider = ({ children }) => {
    const [displayGroupChatMessageState, displayGroupChatMessageDispatch] = (0, react_1.useReducer)(exports.displayGroupChatMessageReducer, { displayGroupChatMessages: null });
    return (0, jsx_runtime_1.jsx)(exports.DisplayGroupChatMessageContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, displayGroupChatMessageState), { displayGroupChatMessageDispatch }) }, { children: children }));
};
exports.DisplayGroupChatMessageContextProvider = DisplayGroupChatMessageContextProvider;
