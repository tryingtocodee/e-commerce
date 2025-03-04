//package imports
import jwt from "jsonwebtoken"

//file imports
import {redis} from "../lib/redis.js"

//db imports
import User from "../model/userModel.js"


//generating token from cookie and redis 
export const generateToken = (userId) =>{
    const accessToken = jwt.sign({userId} , process.env.ACCESS_TOKEN , {expiresIn:"15m"})

    const refreshToken = jwt.sign({userId} , process.env.REFRESH_ACCESS_TOKEN , {expiresIn:"7d"})

    return {accessToken , refreshToken}
}

//store token in redis for fash auth 
const storeRefreshToken = async(userId,refreshToken) =>{
    await redis.set(`refresh_token${userId}` , refreshToken , "EX" ,7 * 24 * 60 * 60) //expires in 7 days
}

const setCookie = (res , accessToken , refreshToken) =>{
    res.cookie("access-token" , accessToken , {
        httpOnly:true, //prevent XSS attacks / prevents access of cookies through js 
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", //prevents CSRF attack cross site request forgery attack
        maxAge: 15 * 60 * 1000 
    })

    res.cookie("refresh-token" , refreshToken , {
        httpOnly:true, //prevent XSS attacks / prevents access of cookies through js 
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", //prevents CSRF attack cross site request forgery attack
        maxAge: 7 * 24 * 60 * 60 *  1000 
    })
}

const signUpController = async(req , res) => {
    const {name , email , password} = req.body;
    try{
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                success:false,
                message : "User already exists"
            })
        }

        
        const user = await User.create({name , email , password})
        
        const {accessToken , refreshToken} = generateToken(user._id) 

        await storeRefreshToken(user._id , refreshToken)


        //storing the token in cookie 

        setCookie(res , accessToken , refreshToken)
        // hashing login already written in useModel file 

        return res.status(201).json({
            success : true,
            message : "User created successfully",
            user: {
                id : user._id,
                name:user.name,
                email : user.email,
                role:user.role
            }
        })
    }catch(error){
        console.log("error in signup controller" , error.messgae)
        return res.json({
            success:false,
            message:`Internal server error ${error.message}`
        })
    }
}



const loginController = async(req , res) => {
    
    try{
        const {email , password} = req.body;
        
        const user = await user.findOne({email})

        if(user && (await user.comparePassword(password))){
            const {accessToken , refreshToken } = generateToken(user._id)

            await storeRefreshToken(user._id , refreshToken)

            setCookie(res , accessToken , refreshToken)

            res.json({
                success:true,
                message:"user logged in successfully",
                user:{
                    id : user._id,
                    name:user.name,
                    email : user.email,
                    role:user.role
                }
            })
        }else{
            res.status(401).json("invalid email or password")
        }
    }catch(error){
        console.log("error in login controller " , error.messagse)
        return res.status(500).json("Internal server error")
    }
   
}



const logoutController = async(req , res) => {
    try{
        const refreshToken = req.cookies.refreshToken

        if(refreshToken){
            const decode = jwt.verify(refreshToken , process.env.REFRESH_ACCESS_TOKEN )
            await redis.del(`refresh_token${decode.userId}`)
        }

        res.clearCookie("access-token")
        res.clearCookie("refresh-token")

        res.json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(error){
        console.log("error in logoutcontroller" , error.message)
        return  res.status(500).json("Internal server error")
    }
}

const refreshToken = async(req , res) =>{
    try{
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken){
            return res.json("refresh token found")
        }

        const decode =  jwt.verify(refreshToken , process.env.REFRESH_ACCESS_TOKEN)
        const storedToken = await redis.get(`refresh-token${decode.userId}`)

        if(decode !== storedToken){
            return res.json("incorrect token")
        }

        const accessToken = jwt.sign({userId : decode.userId} , process.env.ACCESS_TOKEN , {expiresIn:"15m"})

        res.cookie("access-token" , accessToken , {
            httpOnly:true, //prevent XSS attacks / prevents access of cookies through js 
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict", //prevents CSRF attack cross site request forgery attack
            maxAge: 15 * 60 * 1000 
        })

        res.json("token refreshed successfully")
    }catch(error){
        console.log("error in refreshToken controller" , error.message)
        res.status(500).json("Internal server error")
    }
}

export {signUpController , loginController , logoutController , refreshToken}