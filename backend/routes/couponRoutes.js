import express from "express"
import { protectedRoutes } from "../middlewares/authMiddleware.js"
import { validateCouponController  , getCouponController} from "../controllers/getCouponController.js"

const router = express.Router()

router.get("/" , protectedRoutes , getCouponController)
router.get("/validate" , protectedRoutes , validateCouponController)


export default router