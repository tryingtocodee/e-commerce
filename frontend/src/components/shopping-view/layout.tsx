import { Outlet } from "react-router-dom";
import ShoppingHeader from "./shoppingHeader";

export default function ShoppingLayout(){
    return (
        <div className="flex bg-white flex-col overflow-hidden">
            {/*header component */}
            <ShoppingHeader />
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    )
}