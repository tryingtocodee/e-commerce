import mongoose from "mongoose"

export const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNNECT_DB);
        console.log(`mongodb connected ${connect.connection.name}`)
    }catch(error){
        console.log("error connecting to mongodb  " , error.message);
        process.exit(1)
    }
} 