import {v2 as cloudinary} from "cloudinary"
import dotevn from "dotenv"

dotevn.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINAY_CLOUD_NAME,
    api_key : process.env.CLOUDINAY_CLOUD_API_KEY,
    api_secret : process.env.CLOUDINAY_CLOUD_API_SECRET
})

export default cloudinary
