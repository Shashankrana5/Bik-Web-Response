const User = require("../models/User");

import {Request, Response} from 'express';

const SearchUsers: Function = async(req: Request, res: Response) => {

    let passedValues: {[key: string]: any} = {};
    if (req.body.email){
        const email  = req.body.email;
        passedValues.email = {$regex: '^'+email, $options: 'i'};
    }

    if (req.body.fullName){
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

module.exports = {
    SearchUsers
}