"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayChatContentContextProvider = exports.displayChatContentReducer = exports.DisplayChatContentContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.DisplayChatContentContext = (0, react_1.createContext)({});
const displayChatContentReducer = (displayChatContentState, action) => {
    switch (action.type) {
        case ("SET_CHAT_CONTENT"):
            return { displayChatContents: action.payload };
        case ("CREAT_CHAT_CONTENT"):
            return { displayChatContents: [...displayChatContentState["displayChatContents"], action.payload] };
        default:
            return displayChatContentState;
    }
};
exports.displayChatContentReducer = displayChatContentReducer;
const DisplayChatContentContextProvider = ({ children }) => {
    const [displayChatContentState, displayChatContentDispatch] = (0, react_1.useReducer)(exports.displayChatContentReducer, { displayChatContents: null });
    return (0, jsx_runtime_1.jsx)(exports.DisplayChatContentContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, displayChatContentState), { displayChatContentDispatch }) }, { children: children }));
};
exports.DisplayChatContentContextProvider = DisplayChatContentContextProvider;
