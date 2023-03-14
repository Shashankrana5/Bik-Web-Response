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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useGroupChatContext_1 = __importDefault(require("../hooks/useGroupChatContext"));
const GroupChatCreationForm_1 = __importDefault(require("./GroupChatCreationForm"));
const SubmitGroupChatMessage_1 = __importDefault(require("./SubmitGroupChatMessage"));
const GroupChat = (props) => {
    const { user_id, loggedInUserEmail } = props;
    const [receiverGroupId, setReceiverGroupId] = (0, react_1.useState)(null);
    // const displayGroupChats = useDisplayGroupChatMessageContext();
    const chats = (0, useGroupChatContext_1.default)()["groupChats"];
    let index = 0;
    const handleOpen = (event, group_id) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const response = yield fetch(`http://localhost:4000/api/message/groupchat/${group_id}`);
        const json = yield response.json();
        console.log(json);
        setReceiverGroupId(group_id);
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "groupchat-component-container" }, { children: [(0, jsx_runtime_1.jsx)(GroupChatCreationForm_1.default, { user_id: user_id, loggedInUserEmail: loggedInUserEmail }), chats && Object.keys(chats).map(e => {
                return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "indivisual-group-chat" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: event => handleOpen(event, chats[e]._id) }, { children: chats[e].groupName })) }), index++));
            }), (0, jsx_runtime_1.jsx)(SubmitGroupChatMessage_1.default, { senderEmail: loggedInUserEmail, receiverGroupId: receiverGroupId })] })));
};
exports.default = GroupChat;
