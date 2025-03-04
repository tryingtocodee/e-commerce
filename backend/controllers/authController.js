//package imports


//file imports

//db imports
import User from "../model/userModel.js"

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

        // hashing login already written in useModel file 

        return res.status(201).json({
            success : true,
            message : "User created successfully",
            user: user
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
    res.json("loginController")
}



const logoutController = async(req , res) => {
    res.json("logoutController")
}

export {signUpController , loginController , logoutController}