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
const Group = require("../models/Group");
const getGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield Group.find({ _id: id });
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({ error_message: err });
    }
});
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestSender } = req.body;
    const { users } = req.body;
    try {
        const response = yield Group.create({ users: users, admins: requestSender });
        return res.status(200).json({ message: response });
    }
    catch (err) {
        return res.status(400).json({ error_message: err });
    }
});
module.exports = {
    createGroup,
    getGroupById
};