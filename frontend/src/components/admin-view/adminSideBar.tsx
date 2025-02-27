//file imports 
import { adminSideBarMenuItems } from "@/config";

//package imports
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

//shadcn ui 
import {Label} from "@/components/ui/label"

// icons
import { ChartNoAxesCombined } from "lucide-react";




export default function AdminSideBar() {
    const navigate = useNavigate()
    function MenuItem(){
        return <nav className="mt-8 flex-col flex gap-2">
            {
                adminSideBarMenuItems.map((items)=><div className="flex items-center gap-2 rounded-md  px-3 py-2" key={items.id}>
                    
                    <Label >{items.label}</Label>
                </div>)
            }
        </nav>
    } 


    
    return (
        <Fragment>
            <aside className="hidden w-64 flex-col border-r bg--background p-6 lg:flex">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")} >
                    <ChartNoAxesCombined size={25} />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
            <MenuItem />
            </aside>
        </Fragment>
    )
}