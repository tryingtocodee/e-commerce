//file imports
import AdminSideBar from "./adminSideBar"
import AdminHeader from "./adminHeader"

//package imports
import {useState} from "react"
import { Outlet } from "react-router-dom"





export default function AdminLayout() {
    const [openSidebar , setOpenSideBar] = useState(false)
    return (
        <div className="flex h-screen w-screen">
            {/*admin sidebar*/}
            <AdminSideBar open={openSidebar} setOpen={setOpenSideBar}/>

            <div className="flex flex-1 flex-col">
                {/*admin header*/}
                <AdminHeader setOpen={setOpenSideBar} />
                
                <main className="flex flex-1 bg-muted/40 p-4 md:p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}