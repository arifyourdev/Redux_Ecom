import mongoose from "mongoose";

const connDB = async () =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Database Connected`)
    }catch(e){
        console.log('e')
    }
}

export default connDB