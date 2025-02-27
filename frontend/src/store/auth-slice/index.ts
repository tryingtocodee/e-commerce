import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user:null
}

//register response fetch from backend

export const register = createAsyncThunk("/auth/register" ,
   
    async(formData)=>{
        const response = await axios.post("http://localhost:4000/api/auth/register" , formData , { withCredentials : true })
        return response.data
    }
) 

//login response fetch from backend
export const login = createAsyncThunk("/auth/login" ,
   
    async(formData)=>{
        const response = await axios.post("http://localhost:4000/api/auth/login" , formData , { withCredentials : true })
        return response.data
    }
) 

//check auth
export const checkAuth = createAsyncThunk("/auth/checkauth" ,
   
    async()=>{
        const response = await axios.get("http://localhost:4000/api/auth/checkauth"  , { withCredentials : true  , headers : {
            'Cache-control' : 'no-store , no-cache , must-revalidate , proxy-revalidate'
          
        }})
        return response.data
    }
) 


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state , action) =>{}
    },   
    extraReducers : (builder) => {
        //register builders
        builder.addCase(register.pending , (state)=>{
            state.isLoading = true ;
        }).addCase(register.fulfilled , (state , action) =>{
            state.isLoading = false;
            //@ts-ignore
            state.user = null;
            state.isAuthenticated = false
        }).addCase(register.rejected , (state , action)=>{
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false

        }) // login cases 
        .addCase(login.pending , (state)=>{
            state.isLoading = true ;
        }).addCase(login.fulfilled , (state , action) =>{
            state.isLoading = false;
            //@ts-ignore
            state.user = action.payload.success ?  action.payload.user : null;
            //@ts-ignore
            state.isAuthenticated = action.payload.success  
        }).addCase(login.rejected , (state , action)=>{
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false
        })

        //check auth cases
        .addCase(checkAuth.pending , (state)=>{
            state.isLoading = true ;
        }).addCase(checkAuth.fulfilled , (state , action) =>{
            state.isLoading = false;
            //@ts-ignore
            state.user = action.payload.success ?  action.payload.user : null;
            //@ts-ignore
            state.isAuthenticated = action.payload.success  
        }).addCase(checkAuth.rejected , (state , action)=>{
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false
        })
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer