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
    // const users: {[key:string]: string} = req.body.users;

    const admins = Object();
    admins[user_id] = requestSender;
    // users[user_id] = requestSender;
    
    console.log(req.body.users);
    // try{

    //     if (groupName){
    //         const response: {[key: string]: string} = await Group.create({users, admins, groupName})
    //     return res.status(200).json(response);
    // }
    //     else{
    //         const response: {[key: string]: string} = await Group.create({users, admins});
    //         return res.status(200).json(response);
            
    //     }

    // }catch(err){
    //     return res.status(400).json({error_message: err});
    // }
}

const findGroupchatFromEmail: Function = async(req: Request, res: Response) => {

    const { email } = req.params;
    console.log(email)
    try {
        // const response =  await Group.find({users: {"firstid": "jaylen@xyz.com", "63c2a594b1d5914df517bb42": "shashank@xyz.com"}});
        const response = await Group.find({$match: {"users.firstid": "jaylen@xyz.com"}})
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