/* eslint-disable no-dupe-keys */
import {create} from "zustand"
import axios from "../lib/axios.js"
import {toast} from "react-hot-toast"



const useUserStore = create((set ) =>({
    user : null,
    loading  : false,
    checkingAuth : true,

    signup : async ({name , email , password , confirmPassword}) => {
        set({loading : true})

        if(password !== confirmPassword){
            return toast.error("Password doesnt match with confirm password")
        }

        try{
            const res = await axios.post("/auth/signup" , {name , email , password})
            set({user : res.data , loading : false})
        }catch(e){
            set({loading : false})
            toast.error(e.response.data.messsage || "error occured")
            console.log("error in signup zustand")
        }
    },

    login : async ({email , password}) =>{
        set({loading : true})
        try {
            const res = await axios.post("/auth/login" , {email , password} , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            console.log("user" , res)
            set({user : res.data, loading : false})
        } catch (e) {
            set({loading : false})
            toast.error(e.response.messsage || "error occured")
            console.log("error occured in login zustand")
        }
    },

    checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile") ;
			set({ user: response, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

    logout : async () =>{
        try {
            await axios.post("/auth/logout")
            set({user : null})
        } catch (e) {
            console.log("error in logout zustand" , e.message)
            toast.error("error occured")
        }
    }
   
}))

export default useUserStore
