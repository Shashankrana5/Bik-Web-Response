import { Request, Response } from "express";
import Category from "../model/Category";

export async function getCategories(req:Request, res: Response) {

    try {
        const response = await Category.find({}).sort("category");
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }
}

export async function addCategory(req: Request, res: Response){
    const { category } = req.body;

    try{ 
        const response = await Category.create({category});
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }
}