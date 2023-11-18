import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please Provide a username"],
        unique: true,
    },
    email:{
        type: String,
        required: [true,"Please Provide a email"]
    },
    password:{
        type:String,
        required: [true,"Please Provide a password"]
    },
    isVarified:{
        type:Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    varifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model('users',userSchema)


export default User;
