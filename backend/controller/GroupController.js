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
    const { user_id, requestSender, groupName } = req.body;
    // const users: {[key:string]: string} = req.body.users;
    const admins = Object();
    admins[user_id] = requestSender;
    // users[user_id] = requestSender;
    console.log(req.body.users);
    // try{
    //     if (groupName){
    //         const response: {[key: string]: string} = await Group.create({users, admins, groupName})
    //     return res.status(200).json(response);
    // }
    //     else{
    //         const response: {[key: string]: string} = await Group.create({users, admins});
    //         return res.status(200).json(response);
    //     }
    // }catch(err){
    //     return res.status(400).json({error_message: err});
    // }
});
const findGroupchatFromEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log(email);
    try {
        // const response =  await Group.find({users: {"firstid": "jaylen@xyz.com", "63c2a594b1d5914df517bb42": "shashank@xyz.com"}});
        const response = yield Group.find({ $match: { "users.firstid": "jaylen@xyz.com" } });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports = {
    createGroup,
    getGroupById,
    findGroupchatFromEmail
};
