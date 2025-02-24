import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieparser from "cookie-parser"
import authRoutes from "./routes/auth/auth-routes"

//file imports 
import { PORT } from "./config/config"

//db connect 
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://mohdmubeen5042:MubeeN11@cluster0.k4ogs.mongodb.net/")
        console.log("connect to mongodb")
    } catch (e: any) {
        console.log(e.message)
    }
}

connect()


const app = express()


app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Expires",
        "Cache-Control",
        "Pragma"
    ]
}))

app.use("/api/auth" , authRoutes)
app.listen(PORT, () => console.log(`server is runing on port ${PORT}`))