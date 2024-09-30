import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.error = null;
            localStorage.setItem('token', action.payload);
        },
        loginFail: (state, action) => {
            state.error = action.payload;
            state.token = null;
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFail, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
