"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useDisplayGroupChatMessageContext_1 = __importDefault(require("../hooks/useDisplayGroupChatMessageContext"));
const DisplayGroupChatMessage = () => {
    const displayGroupChatMessages = (0, useDisplayGroupChatMessageContext_1.default)()["displayGroupChatMessages"];
    const displayGroupChatMessageDispatch = (0, useDisplayGroupChatMessageContext_1.default)()["displayGroupChatMessageDispatch"];
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "indivisual-group-chat-message" }, { children: displayGroupChatMessages && displayGroupChatMessages.map(element => {
            return ((0, jsx_runtime_1.jsx)("div", { children: element.senderEmail + ":                             " + element.content }, element._id));
        }) })));
};
exports.default = DisplayGroupChatMessage;
