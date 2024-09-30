// src/components/UpdateTaskForm.js
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard/popupForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask as updateTaskAction, fetchTasks } from '../../redux/taskSlice'; 

const UpdateTaskForm = ({ closePopup, task }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'To Do',
        priority: 'Medium',
    });

    const token = useSelector((state) => state.auth.token); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate.split('T')[0], 
                status: task.status,
                priority: task.priority,
            });
        }
    }, [task]);

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
            await dispatch(updateTaskAction({ token, taskId: task._id, formData }));
            await dispatch(fetchTasks(token, '', {}));
            closePopup(); 
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form-container">
                <h2 className='formTitle'>Update Task</h2>
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
                    <button className='newTaskSubmit' type="submit">Update Task</button>
                    <button className='closeButton' type="button" onClick={closePopup}>
                        <i className="fa-solid fa-xmark fa-2xl"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTaskForm;
