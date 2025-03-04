//package imports
import express from "express"

//file imports
import { signUpController , loginController , logoutController } from "../controllers/authController.js"

const router = express.Router()

router.post("/signup" , signUpController)
router.post("/login" , loginController)
router.post("/logout" , logoutController)


export default router
