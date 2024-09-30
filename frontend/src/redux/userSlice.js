import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userList: [],
    role: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.userList = action.payload;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setUserRole: (state, action) => {
            state.role = action.payload; 
        },
    },
});

const BASE_URL = process.env.REACT_APP_BACKEND_LINK; 

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, setUserRole } = userSlice.actions;

export const fetchUsers = (token) => async (dispatch) => {
    dispatch(fetchUsersStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
        dispatch(fetchUsersFailure(error.message));
    }
};

export const fetchUserRole = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/user/role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(setUserRole(response.data.role)); 
    } catch (error) {
        console.error('Error fetching user role:', error);
    }
};

export default userSlice.reducer;
