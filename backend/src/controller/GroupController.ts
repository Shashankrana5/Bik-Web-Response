import { Request, Response } from "express"

const Group = require("../models/Group")

const getGroupById: Function = async (req: Request, res: Response) => {

    const { id }: {[key: string]: string} = req.params;

    try{
        const response: {[key: string]: any} = await Group.find({_id: id});
        return res.status(200).json(response);
    }catch(err){
        return res.status(400).json({error_message: err})
    }
}

const createGroup: Function = async(req: Request, res: Response) =>{

    console.log(req.body);

    const {user_id, requestSender, groupName}: {[key: string]: string} = req.body;
    const sender: {[key:string]: string} = {user_id, email: requestSender}
    const admins = {user_id, email: requestSender};
    try{

        const response: {[key: string]: string} = await Group.create({users: sender, admins, groupName})
        return res.status(200).json(response);

    }catch(err){
        return res.status(400).json({error_message: err});
    }
}



module.exports = {
    createGroup,
    getGroupById
}