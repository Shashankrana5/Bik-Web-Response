"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useDisplayChatContentContext_1 = __importDefault(require("../hooks/useDisplayChatContentContext"));
const DisplayChatContent = () => {
    const context = (0, useDisplayChatContentContext_1.default)();
    const displayChatContents = context["displayChatContents"];
    const displayChatContentDispatch = context["displayChatContentDispatch"];
    return ((0, jsx_runtime_1.jsx)("div", { children: displayChatContents && displayChatContents.map(d => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "indivisual-personal-chat" }, { children: [d.content, " ", d.senderEmail] })))) }));
};
exports.default = DisplayChatContent;
