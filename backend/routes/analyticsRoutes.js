import express from "express"
import { adminRoute, protectedRoutes } from "../middlewares/authMiddleware.js"
import { analyticsController } from "../controllers/analyticsController.js"

const router = express.Router()

router.get("/" ,protectedRoutes , adminRoute, analyticsController )


export default router
