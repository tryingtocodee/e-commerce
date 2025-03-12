import Products from "../model/productModel.js"

const addToCartController = async (req , res) =>{
    try {
        const {productId} = req.body

        const user = req.user

        const existingItem = await user.cartItem.find((item) => item.id === productId)

        if(existingItem){
            existingItem.quantity +=1
        }else {
            user.cartItem.push(productId)
        }

        await user.save()

        return res.json(user.cartItem)

    } catch (e) {
        console.log("error in addToCartController " , e.message)
        return res.status(500).json({
            success : false,
            message:"Internal server error"
        })
    }
}


const getCartProductsController = async (req , res) =>{
    try {
        const products = await Products.find({_id:{$in : req.user.cartItem}})

        //add quantity for each product

        const cartItem = products.map(product =>{
            const items = req.user.cartItem.find(cartItem => cartItem.id === product.id)
            return {...product.toJSON() , quantity : items.quantity}
        })

        return res.json(cartItem)


    } catch (e) {
        console.log("error in addToCartController " , e.message)
        return res.status(500).json({
            success : false,
            message:"Internal server error"
        })
    }
}


const removeAllFromCartController = async (req , res) =>{
    try {
        const {productId} = req.body

        const user = req.user

        if(!productId){
            user.cartItem = []
        }else {
            user.cartItem = await user.cartItem.filter((item) => item.id !== productId)
        }

        await user.save()

        
        return res.json({
            success : true,
            message : "Cart items",
            cartItem : user.cartItem
        })

    } catch (e) {
        console.log("error in addToCartController " , e.message)
        return res.status(500).json({
            success : false,
            message:"Internal server error"
        })
    }
}


const updateQuantityController = async (req , res) =>{
    try {

        const {id :productId} = req.params
        const {quantity} = req.body

        const user = req.user
        const existingItem = await user.cartItem.find((item)=>item.id === productId)

        if(existingItem){
            if(quantity === 0){
                user.cartItem = user.cartItem.filter((item)=>item.id !== productId)
                await user.save()
                return res.json(user.cartItem)

            }else{
                return res.json("product not found ")
            }
        }



    } catch (e) {
        console.log("error in updateQuantityController " , e.message)
        return res.status(500).json({
            success : false,
            message:"Internal server error"
        })
    }
}




export { addToCartController , getCartProductsController , removeAllFromCartController , updateQuantityController }