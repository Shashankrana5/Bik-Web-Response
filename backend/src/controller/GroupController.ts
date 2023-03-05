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



    const {user_id, requestSender, groupName}: {[key: string]: string} = req.body;
    const users: {[key:string]: string} = req.body.users;

    const admins = Object();
    admins[user_id] = requestSender;
    users[user_id] = requestSender;
    
    try{

        if (groupName){
            const response: {[key: string]: string} = await Group.create({users, admins, groupName})
        return res.status(200).json(response);
    }
        else{
            const response: {[key: string]: string} = await Group.create({users, admins});
            return res.status(200).json(response);
            
        }

    }catch(err){
        return res.status(400).json({error_message: err});
    }
}



module.exports = {
    createGroup,
    getGroupById
}