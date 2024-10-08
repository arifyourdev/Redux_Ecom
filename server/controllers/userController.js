import userModal from "../modals/userModal.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const addUser = async (req,res) => {
    try{
     const {name,email,password} = req.body
     if (!name || !email || !password) {
        return res.status(400).send({ status: false, message: "All fields are required" });
      }
     if(!name){
        res.send({message:"name is required"})
     }
     const userExist = await userModal.findOne({email})
     if(userExist){
        return res.status(409).send({status:false,message:'User already exists'})
     }
     const passHash = await bcrypt.hash(password,10)
     const adduser = await userModal({name,email,password:passHash})
     adduser.save()
     res.status(200).send({status:true,message:'User Registered'})
    }catch(e){
        console.log(e)
        res.status(500).send({ status: false, message: "Server error" });
    }
}

export const loginUser = async (req,res) =>{
    try{
    const {email,password} = req.body
    const user = await userModal.findOne({email})
    if(!user){
        res.status(500).send({status:false,message:"User not found"})
    }
    const matchPass = await bcrypt.compare(password,user.password)
    if(!matchPass){
        res.status(500).send({status:false,message:'Password not match'})
    }
    const token = await JWT.sign({id:user._id},process.env.JTW_TOKEN,{expiresIn:'2h'})
    res.status(200).send({
        status:true,
        user:user,
        token
    })

    }catch(e){
        console.log(e)
        res.status(500).send({status:false,message:'Error in Code'})
    }
}