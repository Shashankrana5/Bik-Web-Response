const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({

    // _id: {
    //     type:String,
    //     require: true
    // },
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
    }
})

userSchema.statics.login = async function(email, password){

    if (!email || !password){
        throw Error("Fields must not be empty")
    }
    const user = await this.findOne({email})

    if (!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Incorrect password")
    }
    return user;
}


userSchema.statics.signup = async function (fullName, email, password){

    if (!fullName || !email || !password){
        throw Error("all fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Must be a valid email address")
    }

    const exists = await this.findOne({email})

    if (exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({fullName, email, password: hash})

    return user;
}
module.exports = mongoose.model("User", userSchema);