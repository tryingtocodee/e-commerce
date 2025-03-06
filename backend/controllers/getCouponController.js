//file imports
import Coupon from "../model/couponModel.js"

const getCouponController = async (req , res) =>{
    try {
        const coupon = await Coupon.findOne({userId : req.user._id , isActive : true})
        return res.json(coupon || null)
    } catch (e) {
        console.log("error in getCoupon controller " , e.message)
        return res.status(500).json({
            success : false ,
            message : "Internal server error "
        })
    }
}

const validateCouponController = async (req , res) =>{
    try {
        const {code} = req.body

        const vallidCoupon = await Coupon.findOne({code : code , userId : req.user._id , isActive : true})
        
        if(!vallidCoupon){
            return res.json("coupon not found ")
        }

        if(vallidCoupon.expirationDate < new Date()){
            vallidCoupon.isActive = false
            await vallidCoupon.save()
            return res.json("coupon expired")
        }

        return res.json({
            message : "coupon is valid",
            code : vallidCoupon.code,
            discountPercentage : vallidCoupon.discountPercentage
            
        })

    } catch (e) {
        console.log("error in validateCoupon controller" , e.message)
        return res.status(500).json({
            success : false ,
            message : "Internal server error "
        })
    }
}


export {validateCouponController , getCouponController}