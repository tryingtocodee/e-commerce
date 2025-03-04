import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : ["true" , "Name is required"]
    },
    email:{
        type:String,
        required : ["true" , "email is required"],
        unique : true
    },
    password:{
        type: String,
        required:["true" , "password is required"],
        minlength : [6 , "password must be minimum of 6 characters"]
    },
    cartItem:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type:String,
        enum:["customer" , "admin"],
        default:"customer"
    }
},{timestamps:true})



//pre save hook to hash password before saving to db
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password , salt)
        next()
    }catch(error){
        next(error)
        console.log("error hashing the password . check user model schema file")
    }
})


//compare password
userSchema.methods.comparePassword = async function(password){
    try{
        return bcrypt.compare(password , this.password)
    }catch(error){
        console.log("error comparing the password . check user model schema file")
    }
}

const User = mongoose.model("User" , userSchema)

export default User