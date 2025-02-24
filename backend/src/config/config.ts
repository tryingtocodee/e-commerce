import dotenv from "dotenv"

dotenv.config()


const PORT = process.env.PORT
const jwtKey = process.env.JWT_SECRET

export {PORT, jwtKey}



