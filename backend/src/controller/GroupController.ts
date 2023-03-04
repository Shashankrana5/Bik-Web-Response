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

    const { requestSender }: {[key: string]: string} = req.body;
    const {users}: {[key: string]: any} = req.body;

    try{

    const response: {[key: string]: any} = await Group.create({users: users, admins: requestSender});
    return res.status(200).json({message: response})

}catch(err){
        return res.status(400).json({error_message: err});
    }
}



module.exports = {
    createGroup,
    getGroupById
}