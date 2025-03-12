import axios from "../lib/axios.js"
import {toast} from "react-hot-toast"
import { create } from "zustand"


const useProductStore = create((set) =>({
    products : [] ,
    loading : false,

    setProducts: (products) => set({ products }),

	createProduct: async (productData) => {
		set({ loading: false });
		try {
            console.log("reached zustand try block")
			const res = await axios.post("/products", productData);
            console.log("got the product" )
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
            toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllProducts : async () => {
		set({loading : true})
		try {
			const res = await axios.get("/products")
			set({products : res.data.products , loading : false})
		} catch (e) {
			set({loading : false})
			console.log(e.messgae , "eerror in fetch all products zustand")
			toast.error("error occured")
		}
	},

	fetchProductsByCategory : async(category)=>{
		set({loading : true})

		try {
			const res = await axios.get(`/products/category/${category}`)
			set({products : res.data.products , loading : false})
		} catch (e) {
			console.log("error in fetch products by category zustand" , e.message)
			toast.error(e.res.data.error || "error occured")
		}
	},

	deleteProducts : async (productId) => {
		set({loading : false})

		try {
			await axios.delete(`/products/${productId}`)
			set((prevProducts)=>({
				products : prevProducts.products.filter((product) => product._id !== productId),
				loading : false
			}))
		} catch (e) {
			toast.error(e.res.data.error ||"error occured")
			console.log("error occured in deleteProducts zustand " , e.message)
		}
	} ,

	toggleFeatureProducts : async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	}
    
}))


export default useProductStore