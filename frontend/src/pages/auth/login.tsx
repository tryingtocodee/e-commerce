import { Link } from "react-router-dom"
import { useState } from "react"
import CommonForm from "@/components/common/form"
import { loginFormControl } from "@/config"

const initialState = {
    userName: '',
    email: '',
    password: '',

}

export default function AuthLogin() {
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = () => {

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