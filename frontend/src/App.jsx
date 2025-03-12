import { Navigate, Route, Routes } from "react-router-dom";

//file imports
import HomePage from "./pages/homePage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import NavBar from "./components/navBar";
import { Toaster } from "react-hot-toast";
import useUserStore from "./store/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/adminPage";
import CategoryPage from "./pages/categoryPage";
import CartPage from "./pages/cartPage";
import { useCartStore } from "./store/useCartStore";


export default function App() {
  const {user , checkAuth } = useUserStore()
  const isAdmin = true;
  const {getCartItems} = useCartStore()

  useEffect(()=>{
    checkAuth()
 
  } , [checkAuth])

  useEffect(()=>{
    getCartItems()
  },[getCartItems])

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/secret-dashboard" element={isAdmin ? < AdminPage /> : <Navigate to="/login"/> } />
          <Route path="/category/:category" element={<CategoryPage/> } />
          <Route path="/cart" element={user ? < CartPage /> : <Navigate to="/login"/> } />

        </Routes>
      </div>
      <Toaster />
    </div>
  )
}