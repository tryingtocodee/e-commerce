import { Outlet } from "react-router-dom"
import AdminHeader from "./adminHeader"
import AdminSideBar from "./adminSideBar"


export default function AdminLayout() {
    return (
        <div className="flex h-screen w-screen">
            {/*admin sidebar*/}
            <AdminSideBar />

            <div className="flex flex-1 flex-col">
                {/*admin header*/}
                <AdminHeader />
                
                <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}