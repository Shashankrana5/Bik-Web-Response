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
const User = require("../models/User");
const SearchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let passedValues = {};
    if (req.body.email) {
        const email = req.body.email;
        passedValues.email = { $regex: '^' + email, $options: 'i' };
    }
    else if (req.body.fullName) {
        const fullName = req.body.fullName;
        passedValues.fullName = { $regex: '^' + fullName, $options: 'i' };
    }
    try {
        const user = yield User.find(passedValues);
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
const genericUserSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParam = req.params.searchparam;
    console.log(searchParam);
    try {
        let user = yield User.find({ email: searchParam });
        if (user.length > 0) {
            return res.status(200).json(user[0]);
        }
        user = yield User.find({ fullName: searchParam });
        if (user.length > 0) {
            return res.status(200).json(user[0]);
        }
        return res.status(200).json({ message: "No users found!" });
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});
module.exports = {
    SearchUsers,
    genericUserSearch
};
