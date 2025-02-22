//package import 
import  {Request , Response} from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//db import 
import User from "../../model/user"


//register

const registerController = async(req :Request , res:Response ) =>{
    const {username , password , email}  = req.body;
    try{
        const userExist = await User.findOne({email})

        if(userExist){
            res.json("user with this email  already exists")
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            username ,
            email ,
            password : hashedPassword
        })

        await newUser.save()

        res.status(200).json({
            success:true,
            message:"user registerd successfully",
            username : username,
            email : email
        })
    }catch(e : any){
        console.log("error in register controller" , e.message)
        res.status(400).json("Internal server error")
    }
}

//login

const loginController = async(req :Request , res:Response ) =>{
    const { password , email}  = req.body;
    try{
        const userExist = await User.findOne({email})
        
    }catch(e : any){
        console.log("error in login controller" , e.message)
        res.status(400).json("Internal server error")

    }

    

}

//logout 

const logoutController = async(req: Request , res:Response) => {

}



//auth middleware 

export {registerController , loginController , logoutController}