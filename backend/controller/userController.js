const User = require("../models/User")

const getUser = async (req,res) => {

    const {id} = req.params;
    console.log(id);

    try{
        const user = await User.findById(id)
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
}

const getAllUsers = async (req, res) => {

    try{
        const users = await User.find({})

        return res.status(200).json(users);
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
}

const createUser = async (req, res) => {

    const { fullName, email, password } = req.body;

    try{
    const user = await User.create({ fullName, email, password });

    return res.status(200).json(user);
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
}

module.exports = {
    getUser,
    getAllUsers,
    createUser
}