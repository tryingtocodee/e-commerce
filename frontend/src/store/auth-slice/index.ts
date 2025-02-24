import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isAuthenticated : false,
    isLoading :false,
    user:null
}

export const register = createAsyncThunk("/auth/register" ,
   
    async(formData)=>{
        const response = await axios.post("http://localhost:4000/api/auth/register" , formData , { withCredentials : true })
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

        })
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer