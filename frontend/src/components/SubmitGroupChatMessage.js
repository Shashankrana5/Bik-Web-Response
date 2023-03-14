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
const react_1 = require("react");
const SubmitGroupChatMessage = (props) => {
    const { receiverGroupId, senderEmail } = props;
    const [content, setContent] = (0, react_1.useState)("");
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
            }
        }
        catch (err) {
            throw Error(err);
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "group-chat-message-submit" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "message" }, { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "Group chat message goes here", onChange: e => setContent(e.target.value) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSend }, { children: "Submit message" }))] })) })));
};
exports.default = SubmitGroupChatMessage;
