import { Request, Response } from "express"

const Category = require("../models/Category");

const getCategories = async(req: Request, res: Response) => {


    try{

        const response = await Category.find({}).sort("category");
        return res.status(200).json(response);

    }catch(err){
        return res.status(400).json({message: err})
    }
}

const addCategory = async(req: Request, res: Response) => {

    const category = req.body.category;

    try {

        const response = await Category.create({category})
        return res.status(200).json(response);

    }catch(err){
        return res.status(400).json({message: err})
    }
}

module.exports = {
    getCategories,
    addCategory
}