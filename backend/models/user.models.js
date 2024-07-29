import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema ({
    username  : {
        type : String,
        required : true,
    },
    fullName  : {
        type : String,
    },
    email  : {
        type : String,
        required : true,
    },
    password  : {
        type : String,
        required : true,
    },

    role  :{
        type : String,
        default : "user"
    },

    refreshToken : {
        type : String
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function  (password) {
    return await bcrypt.compare(password,  this.password)
}

userSchema.methods.generateAccessToken = async function  () {
    return jwt.sign({
        _id : this._id,
        fullName : this.fullName,
        username : this.username,
        email : this.email
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn : "1d"}
)
}

userSchema.methods.generateRefreshToken = async function  () {
    return jwt.sign({
        _id : this._id,
        email : this.email
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn : "10d"}
)
}


userSchema.methods.generateResetPasswordToken = async function  () {
    return jwt.sign({
        _id : this._id,
    },
    process.env.RESET_PASSWORD_TOKEN_SECRET,
    {expiresIn : "10m"}

)
}

const User  = mongoose.model('User', userSchema);

export default  User