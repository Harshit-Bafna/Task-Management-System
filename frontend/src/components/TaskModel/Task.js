import React from 'react';
import '../../styles/Task/task.css';

const Task = ({ task, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(task._id); 
  };

  const handleUpdate = () => {
    onUpdate(task); 
  };

  return (
    <div className='task'>
      <p className='title'>{task.title}</p>
      <p className='taskId'>Id: {task._id}</p>
      <div className='assignment'>
        <p>To: {task.assignedTo}</p>
        <p>By: {task.assignedBy}</p>
      </div>
      <p className='description'>{task.description}</p>
      <div className='date'>
        <p><span>Due Date:</span> {new Date(task.dueDate).toLocaleString()}</p>
      </div>
      <div className='statusPriority'>
        <button>{task.status}</button>
        <button>{task.priority}</button>
      </div>
      <button className='deleteTask' onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
      <button className='updateTask' onClick={handleUpdate}>
        U
      </button>
    </div>
  );
};

export default Task;
