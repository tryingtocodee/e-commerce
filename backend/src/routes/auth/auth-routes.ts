import express from "express"
import { registerController  , logoutController } from "../../controllers/auth/auth-controller"
import { loginController } from "../../controllers/auth/auth-controller"

const router = express.Router()

router.post("/register" ,  registerController)
router.post("/login" ,  loginController)
router.post("/logout" ,  logoutController)


export default router