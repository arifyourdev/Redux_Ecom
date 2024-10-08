import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    status:{
        type:Number
    },
    date: { type: Date, default: Date.now },
})

export default mongoose.model('User',userSchema)