"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsContextProvider = exports.chatsReducer = exports.ChatsContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.ChatsContext = (0, react_1.createContext)({});
const chatsReducer = (chatsState, action) => {
    switch (action.type) {
        case ("SET_CHAT"):
            return { chats: action.payload };
        default:
            return chatsState;
    }
};
exports.chatsReducer = chatsReducer;
const ChatsContextProvider = ({ children }) => {
    const [chatsState, chatsDispatch] = (0, react_1.useReducer)(exports.chatsReducer, { chats: null });
    return (0, jsx_runtime_1.jsx)(exports.ChatsContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, chatsState), { chatsDispatch }) }, { children: children }));
};
exports.ChatsContextProvider = ChatsContextProvider;
