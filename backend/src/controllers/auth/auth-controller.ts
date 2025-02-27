//package import 
import  {NextFunction, Request , Response} from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//file import
import { jwtKey } from "../../config/config";
//db import 
import User from "../../model/user"



//register

const registerController = async(req :Request , res:Response ) :Promise<any> =>{
    const {userName , password , email}  = req.body;
    try{
        const userExist = await User.findOne({email})

        if(userExist){
           return   res.json("user with this email  already exists")
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            userName ,
            email ,
            password : hashedPassword
        })

        await newUser.save()

       return  res.status(200).json({
            success:true,
            message:"user registerd successfully",
            username : userName,
            email : email
        })
    }catch(e : any){
        console.log("error in register controller" , e.message)
       return  res.status(400).json("Internal server error")
    }
}

//login

const loginController = async(req :Request , res:Response ) : Promise<any> =>{
    const { password , email}  = req.body;
    try{
        const userExist = await User.findOne({email})

        if(!userExist){
           return  res.status(400).json("user with this email doesnt exist")
        }
            
        const verifyPassword  = await bcrypt.compare(password , userExist?.password!)
        
        
        if(!verifyPassword){
           return res.json("incorrrect password")
        }
        
        
        if(!jwtKey){
            console.error("JWT_SECRET missing from login controller.");
            return res.status(500).json("Internal server error.");
        }

        const token = jwt.sign({id : userExist?._id , email: userExist?.email , role:userExist?.role } , jwtKey! , {expiresIn : "15d"})

        return res.cookie("token" , token , {
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
       return res.status(400).json("Internal server error")

    }

    

}

//logout 

const logoutController = async(req: Request , res:Response): Promise<any> => {
    return res.clearCookie("token").json({
        success:true,
        message:"user logged out successfully"
    })
}



//auth middleware 

const protectedRoute = async(req : Request , res: Response , next: NextFunction) : Promise<any> =>{
    
        const token = req.cookies.token

        if(!token){
           return  res.json({
                message:"unathorized user"

            })
        }

        try{
            const decode = jwt.verify(token , jwtKey!  )
            //@ts-ignore
            req.user = decode
            next()
        }catch(e:any){
            console.log("error in auth routes " , e.message)
            return res.json("internal server error")
        }
    
}

export {registerController , loginController , logoutController , protectedRoute}