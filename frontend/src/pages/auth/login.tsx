//package imports
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"

//file imports
import { loginFormControl } from "@/config"
import { login } from "@/store/auth-slice"


//shadcn ui imports
import CommonForm from "@/components/common/form"



const initialState = {
    userName: '',
    email: '',
    password: '',

}

export default function AuthLogin() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()


    const handleSubmit = (e : Event) => {
        e.preventDefault()
        //@ts-ignore
        dispatch(login(formData)).then((data)=>{
           if(data?.payload?.success){
            //add toast msg here 
           }else{
            //add toast msg that input is incorrect
           }
        })
    }
    return (
        <div className="mx-auto w-full space-y-6 max-w-md " >
            <div className="text-center">
                <h1 className="text-3xl tracking-tight font-bold text-foreground ">Sign in to your account </h1>

            </div>
            <CommonForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText={"Sign In "} formControl={loginFormControl} />
            <p className="mt-2">Dont have an account
                <Link className="font-medium text-blue-400 hover:underline pl-2" to="./auth/register">create an account</Link>
            </p>
        </div>
    )
}