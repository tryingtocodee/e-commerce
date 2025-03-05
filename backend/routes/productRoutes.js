import express from "express"

import { getAllProductsContoller , getFeaturedProductsContoller , createProductsController , deleteProductsController , getProductRecommendationController , getProductsByCategoryController , toggleFeatureProductsController } from "../controllers/productController.js"
import { adminRoute, protectedRoutes } from "../middlewares/authMiddleware.js"

const router = express.Router()


router.get("/" ,protectedRoutes , adminRoute,  getAllProductsContoller)
router.get("/features" ,   getFeaturedProductsContoller)
router.get("/category/:category" ,   getProductsByCategoryController)
router.get("/features" ,   getProductRecommendationController)
router.post("/" , protectedRoutes , adminRoute,  createProductsController)
router.put("/:id" , protectedRoutes , adminRoute,  toggleFeatureProductsController)
router.delete("/:id" , protectedRoutes , adminRoute , deleteProductsController)




export default router