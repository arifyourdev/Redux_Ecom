import express  from "express";
import { addUser, loginUser } from "../controllers/userController.js";
const router = express.Router()

router.get('/user-list',(req,res) =>{
    res.send('This is login router')
})

router.post('/add-user',addUser)
router.post('/user-login',loginUser)

export default router