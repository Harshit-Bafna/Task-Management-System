import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTasksStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTaskSuccess: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        updateTaskSuccess: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
    },
});

export const {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    deleteTaskSuccess,
    updateTaskSuccess,
    addTask,
} = taskSlice.actions;

const BASE_URL = process.env.REACT_APP_BACKEND_LINK; 

export const fetchTasks = (token, searchTerm, filters) => async (dispatch) => {
    dispatch(fetchTasksStart());
    try {
        const queryParams = new URLSearchParams();
        if (filters.priority) queryParams.append('priority', filters.priority);
        if (filters.status) queryParams.append('status', filters.status);

        const endpoint = searchTerm
            ? `${BASE_URL}/api/tasks/search?title=${searchTerm}`
            : `${BASE_URL}/api/tasks?${queryParams.toString()}`;

        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(fetchTasksSuccess(response.data));
    } catch (error) {
        dispatch(fetchTasksFailure(error.message));
    }
};

export const deleteTask = (token, taskId) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const updateTask = ({ token, taskId, formData }) => async (dispatch) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/tasks/${taskId}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(updateTaskSuccess(response.data)); 
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const generateReport = (token, username) => async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/tasks/report?format=csv`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${username}_task_report.csv`); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error generating report:', error);
    }
};

export default taskSlice.reducer;
