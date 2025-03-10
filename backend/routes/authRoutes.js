//package imports
import express from "express"

//file imports
import { signUpController , loginController , logoutController , refreshToken  , getProfile} from "../controllers/authController.js"
import { protectedRoutes } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/signup" , signUpController)
router.post("/login" , loginController)
router.post("/logout" , logoutController)
router.post("/refresh-token" , refreshToken)
router.get("/profile" , protectedRoutes , getProfile)




export default router
