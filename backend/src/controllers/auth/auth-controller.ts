//package import 
import  {NextFunction, Request , Response} from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//file import
import { jwtKey } from "../../config/config";
//db import 
import User from "../../model/user"



//register

const registerController = async(req :Request , res:Response ) :Promise<void> =>{
    const {userName , password , email}  = req.body;
    try{
        const userExist = await User.findOne({email})

        if(userExist){
             res.json("user with this email  already exists")
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            userName ,
            email ,
            password : hashedPassword
        })

        await newUser.save()

        res.status(200).json({
            success:true,
            message:"user registerd successfully",
            username : userName,
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

        if(!userExist){
            res.status(400).json("user with this email doesnt exist")
        }
            
        const verifyPassword  = await bcrypt.compare(password , userExist?.password!)
        
        
        if(!verifyPassword){
            res.json("incorrrect password")
        }
        
        
        if(!jwtKey){
            console.error("JWT_SECRET missing from login controller.");
             res.status(500).json("Internal server error.");
        }

        const token = jwt.sign({id : userExist?._id , email: userExist?.email , role:userExist?.role } , jwtKey! , {expiresIn : "15d"})

        res.cookie("token" , token , {
            httpOnly : true,
            secure : false,
        }).json({
            success:true,
            message : "successfully logged in " , 
            user:{
                id: userExist?._id,
                email : userExist?.email,
                role: userExist?.role
            }
        })
        
        
    }catch(e : any){
        console.log("error in login controller" , e.message)
        res.status(400).json("Internal server error")

    }

    

}

//logout 

const logoutController = async(req: Request , res:Response) => {
    res.clearCookie("token").json({
        success:true,
        message:"user logged out successfully"
    })
}



//auth middleware 

const protectedRoute = async(req : Request , res: Response , next: NextFunction) =>{
    
        const token = req.cookies.token

        if(!token){
            res.json({
                message:"unathorized user"

            })
        }

        try{
            const decode = jwt.verify(token , jwtKey!  )
            //@ts-ignore
            req.user = decode
        }catch(e:any){
            console.log("error in auth routes " , e.message)
            res.json("internal server error")
        }
    
}

export {registerController , loginController , logoutController}