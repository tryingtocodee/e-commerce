import express from "express"
import { protectedRoutes } from "../middlewares/authMiddleware.js"
import { addToCartController , getCartProductsController , removeAllFromCartController , updateQuantityController } from "../controllers/cartController.js"

const router = express.Router()

router.post("/", protectedRoutes , addToCartController)
router.get("/", protectedRoutes ,getCartProductsController)
router.delete("/", protectedRoutes , removeAllFromCartController)
router.put("/:id", protectedRoutes , updateQuantityController)



export default router