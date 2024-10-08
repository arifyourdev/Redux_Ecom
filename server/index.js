import express from "express"
import userRoute from "./routes/userRoute.js"
import dotenv  from "dotenv"
import cors from "cors";
import connDB from "./db/conn.js"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

connDB()

app.use('/api',userRoute)

app.use('/',(req,res) =>{
    res.send('home')
})
const PORT = 8080
app.listen(PORT,() =>{
    console.log(`Server is running on ${PORT}`)
})