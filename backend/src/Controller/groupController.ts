import { Request, Response } from "express";
const Group = require("../model/Group");

export async function addGroup(req: Request, res: Response){

    const {groupName, admins, users} = req.body;

    try{
        const response = await Group.create({groupName, admins, users});
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }

}