import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({

    fullName: {
        type: String,
        require: true,
    },
    
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true
    },
    role:{
        type:String,
        require:true
    }
})

const User =  mongoose.model("User", userSchema);;
module.exports = User;