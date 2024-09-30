import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addTask, fetchTasks } from '../../redux/taskSlice'; 
import { fetchUsers, fetchUserRole } from '../../redux/userSlice'; 
import '../../styles/Dashboard/popupForm.css';

const BASE_URL = process.env.REACT_APP_BACKEND_LINK; 

const PopupForm = ({ closePopup }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'To Do',
        assignedTo: '',  
        priority: 'Medium'
    });

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const isAdmin = useSelector((state) => state.users.role === 'admin'); 
    const userList = useSelector((state) => state.users.userList); 

    useEffect(() => {
        dispatch(fetchUserRole(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (isAdmin) {
            dispatch(fetchUsers(token)); 
        }
    }, [dispatch, isAdmin, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URL}/api/tasks`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(addTask(formData)); 
            alert('Task created successfully');
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                status: 'To Do',
                assignedTo: '',  
                priority: 'Medium'
            });
            closePopup();
            await dispatch(fetchTasks(token, '', {}));
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form-container">
                <h2 className='formTitle'>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Due Date:</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {isAdmin && (
                        <div>
                            <label>Assigned User:</label>
                            <select
                                name="assignedTo"  
                                value={formData.assignedTo}
                                onChange={handleChange}
                            >
                                <option value="">Select a user</option>
                                {userList.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label>Priority:</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button className='newTaskSubmit' type="submit">Submit</button>
                    <button className='closeButton' type="button" onClick={closePopup}>
                        <i className="fa-solid fa-xmark fa-2xl"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
