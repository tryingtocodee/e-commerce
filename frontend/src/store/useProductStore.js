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
			console.log("products" , res.data.products)
			set({products : res.data.products, loading : false})
		} catch (e) {
			set({loading : false})
			console.log(e.messgae , "eerror in fetch all products zustand")
			toast.error("error occured")
		}
	},
	deleteProducts : async () => {
		console.log("hello from delete products")
	} ,

	toggleFeatureProducts : async () => {
		console.log("hello from toggleFeatureProducts ")
	}
    
}))


export default useProductStore