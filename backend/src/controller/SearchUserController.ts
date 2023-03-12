const User = require("../models/User");


import {Request, Response} from 'express';

const SearchUsers: Function = async(req: Request, res: Response) => {

    let passedValues: {[key: string]: any} = {};
    if (req.body.email){
        const email  = req.body.email;
        passedValues.email = {$regex: '^'+email, $options: 'i'};
    }

    else if (req.body.fullName){
        const fullName = req.body.fullName;

        passedValues.fullName = {$regex: '^'+fullName, $options: 'i'};

    }
    try{    
        const user = await User.find(passedValues);
        return res.status(200).json(user)
    }catch(error){
        res.status(400).json({message: error});
    }

}
interface UserModel{
    fullName:string;
    email:string;
}

const genericUserSearch = async(req: Request, res: Response) => {

    const searchParam:string = req.params.searchparam;

    try{

        let user:UserModel[] = await User.find({email: {$regex: '^'+searchParam, $options: 'i'}});

        if (user.length > 0){
            return res.status(200).json(user);
        }

        user = await User.find({fullName: {$regex: '^'+searchParam, $options: 'i'}});
        if (user.length > 0){
            return res.status(200).json(user);
        }
        
        return res.status(200).json({UserNotFoundError: "No users found!"})
    }catch(err){
        return res.status(400).json({error: err});
    }
};



module.exports = {
    SearchUsers,
    genericUserSearch
}