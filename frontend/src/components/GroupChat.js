"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useGroupChatContext_1 = __importDefault(require("../hooks/useGroupChatContext"));
const GroupChatCreationForm_1 = __importDefault(require("./GroupChatCreationForm"));
const GroupChat = (props) => {
    const { user_id, loggedinUserEmail } = props;
    const chats = (0, useGroupChatContext_1.default)()["groupChats"];
    let index = 0;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "groupchat-component-container" }, { children: [(0, jsx_runtime_1.jsx)(GroupChatCreationForm_1.default, { user_id: user_id, loggedInUserEmail: loggedinUserEmail }), chats && Object.keys(chats).map(e => {
                return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "indivisual-group-chat" }, { children: chats[e].groupName }), index++));
            })] })));
};
exports.default = GroupChat;
