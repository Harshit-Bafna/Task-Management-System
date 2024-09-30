// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import userReducer from './userSlice'; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        users: userReducer, 
    },
});

export default store;
