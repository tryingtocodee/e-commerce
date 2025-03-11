//file imports
import Products from "../model/productModel.js"
import {redis} from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"


const getAllProductsContoller = async(req , res) =>{
    try{
        const products = await Products.find()
        res.status(200).json({products})
    }catch(e){
        console.log("error in getAllProductsContoller" , e.message)
        res.status(400).json({
            success : false,
            message : "Internal server error"
        })
    }
}


const getFeaturedProductsContoller = async(req , res) =>{
    try{
        let featuredProducts = await redis.get("featured_products")

        if(featuredProducts){
            return res.json(JSON.parse(featuredProducts))
        }


        //if not in redis check db 

        featuredProducts = await Products.find({isFeatured:true}).lean()
        
        if(!featuredProducts){
            return res.status(400).json("feature products not found ")
        }

        //store in redis 

        await redis.set("featured_products" , JSON.stringify(featuredProducts))

        return res.status(200).json({
            success : true,
            message : "Got featured products"
        })

    }catch(e){
        console.log("error in getFeaturedProductsContoller " , e.message())
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

const createProductsController = async(req , res ) =>{
    try {
        const {name , description , price , image , category } = req.body

        let cloudinaryResponse = null

        if(image){
            cloudinaryResponse = await  cloudinary.uploader.upload(image , {folder:"products"})
        }

        const product = await Products.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse?.secure_url : "",
            category
        })

        return res.status(200).json({
            success:true,
            product : product
        })
    } catch (e) {
        console.log("error in createProductsController" , e.message)
        return res.json({
            success : true,
            message : "Internal server error"
        })
    }
}


const deleteProductsController = async(req , res) =>{
    try{

        const products = await Products.findById(req.params.id);

        if(!products){
            return res.status(400).json("no products found with this id ")
        }

        if(products.image){
            const publicId = await products.split("/").pop().split(".")[0]

            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleted product from clodinay")
            } catch (e) {
                console.log("error in deleteing the product from cloudiany" , e.message)
                return res.json({
                    success : false,
                    message : "Internal server error"
                })
            }
        }

        await Products.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success : true,
            message : "deleted product from db and cloudinay"
        })
    }catch(e){
        console.log("error in deleteProductsController" , e.message)
        return res.status(500).json({
            success : true,
            message : "Internal server error"
        })
    }
}

const getProductRecommendationController = async(req , res) => {
    try{
        const  products  = await Products.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project : {
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                } 
            }
        ])

        return res.json({
            success:true,
            products : products,
            message : "got recommendation successfully"
        })
    }catch(e){
        console.log("error in getProductRecommendationController", e.message)
        return res.status(500).json({
            success : true,
            message : "Internal server error"
        })
    }
}


const getProductsByCategoryController = async (req , res ) =>{
    try {
        const {category} = req.params

        const products = await Products.find({category})

        res.json(products)
    } catch (e) {
        console.log("error in getProductsByCategoryController" ,e.message)
        return  res.json("Internal server error ")
    }
}

const toggleFeatureProductsController = async (req , res) =>{
    try {
        const product = await Products.findById(req.params.id)

        if(product){
            product.isFeatured = !product.isFeatured
            const updatedProducts = await product.save()
            await updateFeaturedProductsCache()
            res.json(updatedProducts)
        }else {
            return  res.json("product not found ")
        }
    } catch (e) {
        console.log("error in toggleFeatureProductsController" , e.messasge)
        return  res.json("Internal server error ")
    }
}

async function updateFeaturedProductsCache(){
    try {
        const featuredProducts = await Products.find({isFeatured:true}).lean()

        await redis.set("feature_products" , JSON.stringify(featuredProducts))

    } catch (e) {
        console.log("error in updateFeaturedProductsCache" , e.message)
        return res.json("Internal server error ")
    }
}

export {getAllProductsContoller , getFeaturedProductsContoller , createProductsController , deleteProductsController , getProductRecommendationController , getProductsByCategoryController , toggleFeatureProductsController}