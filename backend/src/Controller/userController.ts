import { Request, Response } from "express";
import User from "../model/User";

export async function addUser(req: Request, res: Response){

    const { fullName, email, password } = req.body;

    try{
        const user = await User.create({ fullName, email, password });
        return res.status(200).json(user);
    }
    catch(error){
        //@ts-ignore
        return res.status(400).json({message: error.message})
    }
}

export async function getUserById(req:Request ,res:Response){

    const {id} = req.params;

    try{
        const user = await User.findById(id)
        return res.status(200).json(user)
    }
    catch(error){
        //@ts-ignore
        return res.status(400).json({message: error.message})
    }
}

export async function getUserByEmail(req:Request ,res:Response){

    const {email} = req.params;
    console.log(email)
    try{
        const user = await User.findOne({email})
        return res.status(200).json(user)
    }
    catch(error){
        //@ts-ignore
        return res.status(400).json({message: error.message})
    }
}

export async function getAdmins(req: Request, res: Response){
    try {
        const admins = await User.find({role: "ADMIN"});
        return res.status(200).json(admins);
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }
}