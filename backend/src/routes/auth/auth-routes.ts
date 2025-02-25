import express from "express"
import { registerController  , logoutController } from "../../controllers/auth/auth-controller"
import { loginController } from "../../controllers/auth/auth-controller"
import { protectedRoute } from "../../controllers/auth/auth-controller"
const router = express.Router()

router.post("/register" , protectedRoute ,  registerController)
router.post("/login" , protectedRoute ,  loginController)
router.post("/logout" ,  logoutController)


export default router