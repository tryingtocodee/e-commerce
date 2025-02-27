// shad cn ui imports 
import { Button } from "@/components/ui/button"


//icons
import { AlignJustify, LogOut } from "lucide-react"

//@ts-ignore
export default function AdminHeader({setOpen}) {
    return (
        <div className="flex items-center justify-between px-4 pt-2  mt-3 mb-4">
            <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md px-4 text-sm font-medium shadow">
                    <LogOut />
                    <span >Logout</span>
                </Button>
            </div>
        </div>
    )
}