//icons 
import { LayoutDashboard , PackageSearch , ShoppingBasket } from "lucide-react"




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


export const adminSideBarMenuItems = [
    {
        id : "Dashboard",
        label : "Dashboard",
        path : "/admin/dashboard",
        icon: LayoutDashboard
    },
    {
        id : "Products",
        label : "Products",
        path : "/admin/products",
        icon:  ShoppingBasket 
    }, 
    {
        id : "Orders",
        label : "Orders",
        path : "/admin/orders",
        icon:  PackageSearch

    }
]