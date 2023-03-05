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
const React = require("react");
const GroupChatCreationgForm = ({ loggedInUserEmail, user_id }) => {
    const [groupCreationParams, setGroupCreationParams] = React.useState({
        groupName: "",
        requestSender: loggedInUserEmail,
        user_id: user_id,
        users: { "63c3aa3cf23cfc29b8270401": "brandon@xyz.com", "63d4553868587458d1bae036": "jayson@xyz.com" }
    });
    if (user_id != "") {
        groupCreationParams.user_id = user_id;
        // setGroupCreationParams({groupName: "", requestSender: loggedInUserEmail, user_id: user_id})
        const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            const group = yield fetch("http://localhost:4000/api/group", {
                method: "POST",
                body: JSON.stringify(groupCreationParams),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("label", { children: " Group Name" }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Enter a group name", onChange: e => setGroupCreationParams({
                            groupName: e.target.value,
                            requestSender: loggedInUserEmail,
                            user_id: user_id,
                            users: { "63c3aa3cf23cfc29b8270401": "brandon@xyz.com", "63d4553868587458d1bae036": "jayson@xyz.com" }
                        }) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: "Create Group" }))] })) }));
    }
};
exports.default = GroupChatCreationgForm;
