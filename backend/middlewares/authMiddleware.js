import User from "../model/userModel"

const protectedRoutes  = async(req , res , next) =>{
    try {
        const accessToken = req.cookies.accessToken

        if(!accessToken){
            return res.json("no token found")
        }

        const decode = jwt.verify(accessToken , process.env.ACCESS_TOKEN)

        if(!decode){
            return res.json("incorrect token")
        }

        const user = await User.findById(decode.userId).select("-password")

        if(!user)
            return res.json("no user found . try logging in again")

        req.user = user

        next()
    } catch (e) {
        console.log("error in protectRoutes function " , e.message)
        return res.status(500).json({
            success : true,
            message : "Internal Server error"
        })
    }
}

const adminRoute = async (req , res ,  next)=>{
    try {   

        if(req.user && req.user.role === "admin"){
            next()
        }else {
            return resjson("unauthorized access . only admin allowed")
        }
        
    } catch (e) {
        console.log("error in admin route" ,e.message)
        return res.status(500).json({
            success : true,
            message : "Internal server error"
        })
    }
}

export{protectedRoutes , adminRoute}