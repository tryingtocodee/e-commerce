import express from "express"
import {protectedRoutes} from "../middlewares/authMiddleware.js"

import { createCheckoutSessionController , checkOutSuccessController} from "../controllers/paymentController.js"

const router = express.Router()

router.post("/create-checkout-session" , protectedRoutes, createCheckoutSessionController)
router.post("/create-success" , protectedRoutes , checkOutSuccessController)




export default router