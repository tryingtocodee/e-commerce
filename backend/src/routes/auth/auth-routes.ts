import express from "express"
import { registerController  , logoutController , protectedRoute , loginController } from "../../controllers/auth/auth-controller"

const router = express.Router()

router.post("/register" ,   registerController)
router.post("/login" ,   loginController)
router.post("/logout" ,  logoutController)

router.get("/checkauth" ,  protectedRoute , (req , res)=>{
    //@ts-ignore
    const user = req.user;
    res.status(200).json({
        success  : "true" ,
        message:"authenticated user",
        user,
    })
})
export default router