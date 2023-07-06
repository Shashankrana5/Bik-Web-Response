import { Request, Response } from "express";
import Group from "../model/Group";

export async function addGroup(req: Request, res: Response){

    const {groupName, admins, users} = req.body;

    try{
        const response = await Group.create({groupName, admins, users});
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json(error);
    }

}
export async function findById(req: Request, res: Response){

    const { id } = req.params;

    try{
        const response = await Group.findById(id);

        return res.status(200.).json(response);
    }catch(error){
        return res.status(400).json(error);
    }
}