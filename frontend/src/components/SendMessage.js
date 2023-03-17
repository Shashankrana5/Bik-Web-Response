"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = require("react");
const io = __importStar(require("socket.io-client"));
const SendMessage = (props) => {
    const currentChat = props.currentChat;
    const currentLoggedinUser = props.currentLoggedinUser;
    const [personalChatSocket, setPersonalChatSocket] = (0, react_1.useState)(null);
    const [content, setContent] = (0, react_1.useState)("");
    const displayChatContentDispatch = props.displayChatContentDispatch;
    const displayChatContents = props.displayChatContents;
    const personalChat = props.personalChat;
    const [socketConnection, setSocketConnection] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (currentLoggedinUser) {
            setPersonalChatSocket(io.connect("http://localhost:9000/personalchat", {
                // query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
                query: { name: currentLoggedinUser }
            }));
            setSocketConnection(io.connect("http://localhost:9000/groupchat", {
                query: { senderEmail: currentLoggedinUser }
            }));
        }
    }, [currentLoggedinUser]);
    (0, react_1.useEffect)(() => {
        if (personalChatSocket) {
            personalChatSocket.on("receive-personal-message", data => {
                console.log(data);
                displayChatContentDispatch({ type: "CREATE_CHAT_CONTENT", payload: data });
            });
        }
    }, [personalChatSocket]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (displayChatContents) {
            const receiverEmail = displayChatContents[0].senderEmail === currentLoggedinUser
                ? displayChatContents[0].receiverEmail
                : displayChatContents[0].senderEmail;
            const messageData = { receiverEmail, currentLoggedinUser, content, type: "personal" };
            const response = yield fetch("http://localhost:4000/api/message/sendmessage", {
                method: "POST",
                body: JSON.stringify({
                    receiverEmail: receiverEmail,
                    senderEmail: currentLoggedinUser,
                    content: content,
                    messageType: "personal"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = yield response.json();
            personalChatSocket.emit("send-personal-message", json);
            displayChatContentDispatch({
                type: "CREATE_CHAT_CONTENT",
                payload: json,
            });
        }
    });
    // useEffect( () => {
    //     if (socketConnection && currentChat){
    //         socketConnection.emit("join-groupchat", currentChat)
    //         socketConnection.on("receive-groupchat-message", data => {
    //             displayChatContentDispatch({type: "CREATE_CHAT_CONTENT", payload: data})
    //         })
    //     }
    // }, [currentChat, socketConnection])
    (0, react_1.useEffect)(() => {
        if (currentChat) {
            socketConnection.emit("join-groupchat", currentChat);
        }
    }, [currentChat]);
    (0, react_1.useEffect)(() => {
        if (socketConnection) {
            socketConnection.on("receive-groupchat-message", data => {
                displayChatContentDispatch({ type: "CREATE_CHAT_CONTENT", payload: data });
            });
        }
    }, [socketConnection]);
    // }, [socketConnection])
    const handleGroupSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        //         {groupId: '6414161c206aadc12aff2ba6', messageType: 'group', content: 'third', _id: '6414256e4f70ad273fcaca4b', 
        // createdAt: '2023-03-17T08:31:42.572Z', …}
        // content
        // : 
        // "third"
        // createdAt
        // : 
        // "2023-03-17T08:31:42.572Z"
        // groupId
        // : 
        // "6414161c206aadc12aff2ba6"
        // messageType
        // : 
        // "group"
        // updatedAt
        // : 
        // "2023-03-17T08:31:42.572Z"
        // __v
        // : 
        // 0
        // _id
        // : 
        // "6414256e4f70ad273fcaca4b"
        try {
            if (currentChat && content) {
                const response = yield fetch("http://localhost:4000/api/message/sendmessage", {
                    method: "POST",
                    body: JSON.stringify({ content, senderEmail: currentLoggedinUser, groupId: currentChat }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = yield response.json();
                console.log(json);
                socketConnection.emit("send-groupchat-message", json);
                displayChatContentDispatch({ type: "CREATE_CHAT_CONTENT", payload: json });
            }
        }
        catch (err) {
            throw Error(err);
        }
    });
    if (personalChat) {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "submit-message-main" }, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "write something", onChange: e => setContent(e.target.value) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSubmit }, { children: "Submit" }))] }) })));
    }
    else {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "submit-message-main" }, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "write something", onChange: e => setContent(e.target.value) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleGroupSubmit }, { children: "Submit" }))] }) })));
    }
};
exports.default = SendMessage;
