import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        min:0,
        required : true 
    },
    image:{
        type:String,
        required:[true , "Image is required"]
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Products = mongoose.model("products" , productSchema)

export default Products