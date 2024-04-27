import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from '../../utils/axiosClient';


export const getMyInfo = createAsyncThunk('user/getMyInfo' , async(body , thunkAPI) =>{
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.get('/api/user/getMyInfo') ; 
     //  console.log("api called data " , response.result) ; 

       return response.result ; 
        
    } catch (error) {
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})

export const updateMyProfile = createAsyncThunk ("/user/updateMyProfile" , async(body , thunkAPI)=> {
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
       console.log("body inside thunk " , body) ; 
        const  response  = await axiosClient.put('/api/user/' , body) ; 
     //  console.log("api called data " , response.result) ; 
       
       return response.result ; 
        
    } catch (error) {
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})

const appConfigSlice = createSlice({
    name :'appConfigSlice' , 
    initialState: {
        isLoading:false  , 
        toastData:{} , 
        myProfile:null 
    } , 
    reducers : {
        setLoading : (state , action) => {
            state.isLoading = action.payload ; 
        } ,
        showToast : (state , action) => {
            state.toastData = action.payload ; 
        }
    } , 
    extraReducers : (builder) =>{
        builder.addCase(getMyInfo.fulfilled , (state , action) =>{
            state.myProfile = action.payload ; 
        }).addCase(updateMyProfile.fulfilled , (state , action) =>{
            state.myProfile = action.payload ; 
        })
    }
})

export default appConfigSlice.reducer ; 
export const {setLoading ,showToast} = appConfigSlice.actions ;