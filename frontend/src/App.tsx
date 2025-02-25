//package imports
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

//file imports
import AuthLayout from "./components/auth/layout.tsx"
import AuthLogin from "./pages/auth/login.tsx"
import AuthRegister from "./pages/auth/register.tsx"
import AdminLayout from "./components/admin-view/layout.tsx"
import AdminProductsPage from "./pages/admin-view/products.tsx"
import AdminDashboardPage from "./pages/admin-view/dashboard.tsx"
import AdminOrdersPage from "./pages/admin-view/orders.tsx"
import ShoppingLayout from "./components/shopping-view/layout.tsx"
import NotFound from "./pages/notFound.tsx"
import ShoppingHomePage from "./pages/shopping-view/home.tsx"
import ShoppingCheckoutPage from "./pages/shopping-view/checkout.tsx"
import ShoppingListingPage from "./pages/shopping-view/listing.tsx"
import ShoppingAccountPage from "./pages/shopping-view/account.tsx"
import CheckAuth from "./components/common/checkAuth.tsx"
import UnAuthPage from "./pages/unauthPage.tsx"


export default function App() {
//ts - fix 
 const {user , isAuthenticated} = useSelector((state : any)=>state.auth)
  return (
    <div>
      <h1 className="text-3xl font-bold ">Header</h1>
      <Routes>
        {/* auth routes */}
        <Route path="/auth" element={<CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <AuthLayout />
        </CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/*admin routes */}
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>}>
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>

        {/*shopping routes */}
        <Route path="/shopping" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth> }>
          <Route path="home" element={<ShoppingHomePage />} />
          <Route path="checkout" element={<ShoppingCheckoutPage />} />
          <Route path="listing" element={<ShoppingListingPage />} />
          <Route path="account" element={<ShoppingAccountPage />} />
        </Route>

        {/*Not found page*/}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage/>} />
      </Routes>
    </div>
  )
}




