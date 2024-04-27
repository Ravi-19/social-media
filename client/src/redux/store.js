import {configureStore} from '@reduxjs/toolkit' ; 
import appConfigReducer from './slices/appConfigSlice';
import postReducer from './slices/postsSlice';
export default configureStore({
     
    reducer:{
        appConfigReducer,
        postReducer
    }

})