import { Button } from "@/components/ui/button"
import { Fragment } from "react/jsx-runtime"

//package imports
import {useState} from "react"

//shadcn ui 
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";

export default function AdminProductsPage() {
    const [openCreateProducts , setOpenCreateProducts] = useState(false)
    return (
        <Fragment>
            <div className="mb-5 flex justify-end w-full" >
            <Button onClick={()=>setOpenCreateProducts(true)}>
                Add New Product
            </Button>
            </div>
            <div className="grip gap-2 md:grid-cols-3 lg:grid--cols-4"></div>
            <Sheet open={openCreateProducts} onOpenChange={()=>{
                setOpenCreateProducts(false)
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            Addd New Product
                        </SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}