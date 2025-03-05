//package imports
import express from "express"

//file imports
import { signUpController , loginController , logoutController , refreshToken  , getProfile} from "../controllers/authController.js"

const router = express.Router()

router.post("/signup" , signUpController)
router.post("/login" , loginController)
router.post("/logout" , logoutController)
router.post("/refresh-token" , refreshToken)
router.post("/profile" , getProfile)




export default router
