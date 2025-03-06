//package imports
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// file imports
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import paymentRoutes from "./routes/paymentRoute.js"

import { connectDb } from "./lib/db.js"




dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT
app.use(cookieParser())

//routes
app.use("/api/auth" , authRoutes)
app.use("/api/products" , productRoutes)
app.use("/api/cart" , cartRoutes)
app.use("/api/coupons" , couponRoutes)
app.use("/api/payments" , paymentRoutes)




app.listen(port , ()=>{
    console.log("port running on port" , port)
    connectDb()
})