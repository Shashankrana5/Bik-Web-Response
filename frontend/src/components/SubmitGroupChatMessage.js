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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useDisplayGroupChatMessageContext_1 = __importDefault(require("../hooks/useDisplayGroupChatMessageContext"));
const io = __importStar(require("socket.io-client"));
const SubmitGroupChatMessage = (props) => {
    const { receiverGroupId, senderEmail } = props;
    const [content, setContent] = (0, react_1.useState)("");
    const displayGroupChatMessageDispatch = (0, useDisplayGroupChatMessageContext_1.default)()["displayGroupChatMessageDispatch"];
    const [socketConnection, setSocketConnection] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setSocketConnection(io.connect("http://localhost:9000/groupchat", {
            query: { senderEmail: props.senderEmail }
        }));
    }, []);
    (0, react_1.useEffect)(() => {
        if (socketConnection && receiverGroupId) {
            socketConnection.emit("join-groupchat", receiverGroupId);
            socketConnection.on("receive-groupchat-message", data => {
                displayGroupChatMessageDispatch({ type: "CREATE_MESSAGE", payload: data });
            });
        }
    }, [receiverGroupId, socketConnection]);
    const handleSend = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            if (receiverGroupId && content) {
                const response = yield fetch("http://localhost:4000/api/message/sendmessage", {
                    method: "POST",
                    body: JSON.stringify({ content, senderEmail, groupId: receiverGroupId }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = yield response.json();
                socketConnection.emit("send-groupchat-message", json);
                displayGroupChatMessageDispatch({ type: "CREATE_MESSAGE", payload: json });
            }
        }
        catch (err) {
            throw Error(err);
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "group-chat-message-submit" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "message" }, { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "Group chat message goes here", onChange: e => setContent(e.target.value) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSend }, { children: "Submit message" }))] })) })));
};
exports.default = SubmitGroupChatMessage;
