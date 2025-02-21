import { Link } from "react-router-dom"
import { useState } from "react"
import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"

const initialState = {
    username: '' ,
    email : '' ,
    password : '',
   
}
export default function AuthRegister(){
    
    const [formData , setFormData] = useState(initialState)

    const handleSubmit = ()=>{
        
    }
    return (
        <div className="mx-auto w-full space-y-6 max-w-md " >
            <div className="text-center">
                <h1 className="text-3xl tracking-tight font-bold text-foreground ">Create An Account</h1>
                <p className="mt-2">Already have an account
                    <Link className="font-medium text-blue-400 hover:underline pl-2" to="./auth/login">Login</Link>
                </p>
            </div>
            <CommonForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText={"Create a account"} formControl={registerFormControls} />
        </div>
    )
} 