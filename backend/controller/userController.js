const User = require("../models/User")
const jwt = require("jsonwebtoken")

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

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password)
        token = createToken(user._id)

        return res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "3d"})
}


const signupUser  = async (req, res) => {

    const {fullName, email, password} = req.body;

    try{
        const user = await User.signup(fullName, email, password);
        const token = createToken(user._id)

        res.status(200).json({ email, token})
    }   
    catch(error){
        res.status(400).json({error: error.message})
    }

}



module.exports = {
    getUser,
    getAllUsers,
    createUser,
    signupUser,
    loginUser
}