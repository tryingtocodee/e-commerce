//icons 
import { LayoutDashboard } from "lucide-react"
import { ReactNode } from "react"

type adminSideBar  =  {
    id:String;
    label:String;
    path:String;
    icon?:ReactNode;
}

export const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter you user name",
        componentType: "input",
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter you email",
        componentType: "input",
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter you password",
        componentType: "input",
        type: "password"
    }
]


export const loginFormControl = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter you email",
        componentType: "input",
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter you password",
        componentType: "input",
        type: "password"
    }]


export const adminSideBarMenuItems : adminSideBar[] = [
    {
        id : "Dashboard",
        label : "Dashboard",
        path : "/admin/dashboard",
        icon:  "LayoutDashboard" 
    },
    {
        id : "Products",
        label : "Products",
        path : "/admin/products",
        icon:  "LayoutDashboard" 

    }, 
    {
        id : "Orders",
        label : "Orders",
        path : "/admin/orders",
        icon:  "LayoutDashboard" 

    }
]