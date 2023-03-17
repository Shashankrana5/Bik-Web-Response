"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext"
const react_1 = require("react");
const ChatsNavigation = ({ chats, chatsDispatch, personalChat, setPersonalChat }) => {
    var index = 0;
    // const {displayMessages, displayMessagesDispatch} = useDisplayMessageContext();
    (0, react_1.useEffect)(() => {
        console.log("here");
        console.log(chats);
    }, [chatsDispatch]);
    const handleOpen = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const receiver = e.target.textContent;
        const loggedinUser = localStorage.getItem("user");
        const loggedinUserEmail = yield JSON.parse(loggedinUser).email;
        const response = yield fetch("http://localhost:4000/api/message/messagesbyemail", {
            method: "POST",
            body: JSON.stringify({ senderEmail: loggedinUserEmail, receiverEmail: receiver }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = yield response.json();
        //    displayMessagesDispatch({type: 'SET_MESSAGES', payload: json})
    });
    if (personalChat) {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "display-chats" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-chats" }, { children: chats && Object.keys(chats["personal"]).map(chat => {
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'border border-yellow-700' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: chats["personal"][chat] }), (0, jsx_runtime_1.jsx)("p", { children: chat })] })));
                }) })) })));
    }
    else {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "display-chats" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-chats" }, { children: chats && Object.keys(chats["group"]).map(chat => {
                    return ((0, jsx_runtime_1.jsx)("div", { children: chats["group"][chat]["0"]["groupName"] }));
                }) })) })));
    }
};
exports.default = ChatsNavigation;
