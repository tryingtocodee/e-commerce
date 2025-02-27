//file imports 
import { adminSideBarMenuItems } from "@/config";

//package imports
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

//shadcn ui 
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";


// icons
import { ChartNoAxesCombined } from "lucide-react";


interface SheetParams {
    open?: any,
    setOpen: any,
}

// these params are for sheet component
export default function AdminSideBar({ open, setOpen }: SheetParams) {
    const navigate = useNavigate()
    
    function MenuItem({setOpen} : SheetParams) {
        return <nav className="mt-8 flex-col flex gap-2">
            {
                adminSideBarMenuItems.map((items) =>
                    <div className="flex cursor-pointer  items-center gap-2 rounded-md px-3 py-2 text-gray-500 hover:text-black text-xl hover:bg-gray-100  " key={items.id} onClick={() => { navigate(items.path) ;  setOpen ? setOpen(false) : null}}>
                        <items.icon size={30} />
                        <span>{items.label}</span>
                    </div>)
            }
        </nav>
    }



    return (
        <Fragment>
            {/*this is for toggle side bar content*/}
            <Sheet open={open} onOpenChange={setOpen} >
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle>
                                <ChartNoAxesCombined size={25} />
                                Admin Panel
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItem setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg--background p-6 lg:flex">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")} >
                    <ChartNoAxesCombined size={25} />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItem setOpen={setOpen} />
            </aside>
        </Fragment>
    )
}