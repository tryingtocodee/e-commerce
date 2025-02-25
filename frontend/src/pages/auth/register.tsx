//package imports
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

//file imports
import { registerFormControls } from "@/config"
import { register } from "@/store/auth-slice"
import CommonForm from "@/components/common/form"

const initialState = {
    userName: '' ,
    email : '' ,
    password : '',
   
}
export default function AuthRegister(){
    
    const [formData , setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   

    const handleSubmit = (e : Event)=>{  
        e.preventDefault();
        //@ts-ignore
        dispatch(register(formData)).then((data)=> {
            console.log(data)
            if(data?.payload?.success) {
                toast(data?.payload?.message)
                navigate("/auth/login")
            } else {
                toast(data?.payload?.message)
            }
        })
    }
 
    
    return (
        <div className="mx-auto w-full space-y-6 max-w-md " >
            <div className="text-center">
                <h1 className="text-3xl tracking-tight font-bold text-foreground ">Create An Account</h1>
                <p className="mt-2">Already have an account
                    <Link className="font-medium text-blue-400 hover:underline pl-2" to="./auth/login">Login</Link>
                </p>
            </div>
            <CommonForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText={"Create a account"} formControl={registerFormControls}     />
        </div>
    )
} 

