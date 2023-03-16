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
const Category = require("../models/Category");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Category.find({}).sort("category");
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
});
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body.category;
    try {
        const response = yield Category.create({ category });
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
});
module.exports = {
    getCategories,
    addCategory
};
