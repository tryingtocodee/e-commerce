//package imports
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// file imports
import authRoutes from "./routes/authRoutes.js"
import { connectDb } from "./lib/db.js"




dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT
app.use(cookieParser())

//routes
app.use("/api/auth" , authRoutes)
app.use("/api/products" , protectedRoutes)


app.listen(port , ()=>{
    console.log("port running on port" , port)
    connectDb()
})