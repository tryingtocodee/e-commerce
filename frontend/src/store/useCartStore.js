import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useCartStore = create((set , get) => ({
    cart : [],
    coupon : null ,
    total : 0,
    subtotal :  0 ,

    getCartItems : async() => {
        try {
            const res = await axios.get("/cart")
            set({cart : res.data})
        } catch (e) {
            set({cart : []})
            toast.error( e.res.data.error||"error occured")
            console.log("error in get cart items zustand")
        }
    },
    addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			
	get().calculateTotals()
		} catch (error) {
			toast.error(error.response.data.error || "An error occurred");
		}
	},
    calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}

		set({ subtotal, total });
	},
	removeFromCart: async(productId) => {
		await axios.delete("/cart" , {data : {productId}})
		set((prevState)=>({ prevState: prevState.cart.filter(item => item._id !== productId)}))
		get().calculateTotals()
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},
}))