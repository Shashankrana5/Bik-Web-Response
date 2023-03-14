"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayGroupChatMessageContextProvider = exports.displayGroupChatMessageReducer = exports.DisplayGroupChatMessageContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.DisplayGroupChatMessageContext = (0, react_1.createContext)({});
// 0
// : 
// {_id: '640fd7eacd814886f9ead652', senderEmail: 'brandon@xyz.com', groupId: '640fd7bbcd814886f9ead644', messageType: 'group', content: 'Hey group', …}
// 1
// : 
// {_id: '640fd7f7cd814886f9ead65e', senderEmail: 'shashank@xyz.com', groupId: '640fd7bbcd814886f9ead644', messageType: 'group', content: 'Hey Brandon', …}
// 2
// : 
// {_id: '64
const displayGroupChatMessageReducer = (displayGroupChatMessageState, action) => {
    switch (action.type) {
        case ("SET_MESSAGE"):
            return { displayGroupChatMessages: action.payload };
        case ("CREATE_MESSAGE"):
            // console.log(displayGroupChatMessageState)
            // {displayGroupChatMessages: }
            return { displayGroupChatMessages: [...displayGroupChatMessageState["displayGroupChatMessages"], action.payload] };
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
