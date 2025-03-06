import { stripe } from "../lib/stripe.js"
import Coupon from "../model/couponModel.js"
import Order from "../model/orderModel.js"

const createCheckoutSessionController = async (req , res)=>{
    try{
        const {products , couponCode } = req.body

        if(!Array.isArray(products) || products.length === 0 ){
            return res.json("invalid or empty products array ")
        }

        const totalAmount = 0
    
        // we have to store the price and response object in lineItems variable // stripe docs 

        const lineItems  = products.map((product)=>{
            const amount = Math.round(product.price * 100 ) // stripe want u to send amount in cents 
            totalAmount += amount * product.quantity

            return {
                price_data:{
                    currency : "usd",
                    product_data : {
                        name : product.name,
                        images : [product.image] // stripe want u send image in array format 
                    },
                    unit_amount : amount
                }
            }
        });

        let coupon = null

        if(couponCode){
            coupon = await coupon.findOne({code : couponCode , userId : req.user._id , isActive : true})

            if(coupon){
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage /100)
            }
        }else {
            return res.json("invalid coupon")
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : lineItems,
            mode : "payment",
            success_url : `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts : coupon ? [
                {
                    coupon : await createStripeCoupon(coupon.discountPercentage)
                }
            ] : [],
            metadata : {
                userId : req.user._id.toString(),
                couponCode : couponCode || "" ,
                products : JSON.stringify(
                    products.map((p)=>({
                        id:p.id,
                        quantity : p.quantity,
                        price : p.price
                    }))
                )
            }

            
            
        });
        //if toatal amount is > 200$
        
        if(totalAmount >= 20000){
            await createNewCoupon(req.user._id)
        }
        res.json({id : session.id , totalAmount : totalAmount / 100})

    }catch(e){
        console.log("error in stripePayment controller" , e.message)
        return res.json({
            success : false,
            message : "Internal Server error"
        })
    }
}

const checkOutSuccessController = async (req , res) => {
    try {
        const {sessionId} = req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if(session.payment_status === "paid"){

            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code : session.metadata.couponCode , userId : session.metadata.userId
                } , {
                    isActive : false
                })
            }

            //create a new order as we got payment
            
            const products = JSON.parse(session.metadata.products)
            const newOrder = new Order({
                user : session.metadata.userId , 
                products : products.map((p)=>({
                    product : p.id,
                    quantity : p.quantity,
                    price : p.price
                })),
                totalAmount : session.amount_total / 100 , //convert from cents to dollars
                stripeSessionId : sessionId
            })

            await newOrder.save()    
            res.json({
                success : true,
                message : "payment successfull , order created , and coupon deactivated if used ",
                orderId : newOrder._id
            })
        }

    } catch (e) {
        console.log("error in checkPaymentController" , e.message)
        return res.json("Internal server error ")
    }
}

async function createStripeCoupon(discountPercentage){
    const coupon = await stripe.coupons.create({
        percent_off : discountPercentage,
        duration : "once"
    })
    return coupon
}

async function createNewCoupon(userId){
    const newCoupon = new Coupon({
        code : "GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage:10,
        expirationDate : new Date(Date.now() + 30  * 24 * 60 * 60 * 1000), // 30 days 
        userId : userId
    })

    await newCoupon.save()

    return newCoupon
}


export {createCheckoutSessionController , checkOutSuccessController}