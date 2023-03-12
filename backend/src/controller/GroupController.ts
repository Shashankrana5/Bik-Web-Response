import { Request, Response } from "express"

const Group = require("../models/Group")

interface UserModel {

    _id: string;
    email: string;
}

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
    const admins: UserModel[] = [];
    const users = req.body.users;

    admins.push({_id: user_id, email: requestSender})


    try{

        if (groupName){
            const response: {[key:string]: string} = await Group.create({users, admins, groupName});
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

const findGroupchatFromEmail: Function = async(req: Request, res: Response) => {

    const { email } = req.params;
    console.log(email)
    try {

        const response = await Group.find({"users.email": email})
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({message: error})
    }
}

const updateGroup:Function = async(req: Request, res: Response) => {
    
}





module.exports = {
    createGroup,
    getGroupById,
    findGroupchatFromEmail
}