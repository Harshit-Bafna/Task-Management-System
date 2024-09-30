import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from '../TaskModel/Task';
import PopupForm from '../Dashboard/PopupForm';
import '../../styles/Dashboard/taskSection.css';
import UpdateTaskForm from './UpdateTaskForm';
import {
  fetchTasks,
  deleteTask as deleteTaskAction,
  updateTask as updateTaskAction,
  addTask as addTaskAction,
  generateReport as generateReportAction,
} from '../../redux/taskSlice'; 

const TaskSection = ({ searchTerm, filters }) => {
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.user?.username);
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch(); // Initialize dispatch
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token, searchTerm, filters)); 
    }
  }, [dispatch, token, searchTerm, filters]);

  const deleteTask = (taskId) => {
    dispatch(deleteTaskAction(token, taskId)); 
  };

  const handleUpdate = (task) => {
    setTaskToUpdate(task);
  };

  const closeUpdateForm = () => {
    setTaskToUpdate(null);
  };

  const openAddTaskPopup = () => {
    setIsPopupOpen(true);
  };

  const closeAddTaskPopup = () => {
    setIsPopupOpen(false);
  };

  const generateReport = () => {
    dispatch(generateReportAction(token, username)); 
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      <button key="prev" onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 4) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`pageButton ${currentPage === i ? 'active' : ''}`}
            >
              {i}
            </button>
          );
        } else if (i === 2 && currentPage > 3) {
          pageButtons.push(<span key="ellipsis-left">...</span>);
        } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
          pageButtons.push(<span key="ellipsis-right">...</span>);
        }
      } else {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pageButton ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    }

    pageButtons.push(
      <button key="next" onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    );

    return pageButtons;
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }

  return (
    <section className='taskSectionWrapper'>
      <div className='allTask'>
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <Task key={task._id} task={task} onDelete={deleteTask} onUpdate={handleUpdate} />
          ))
        ) : (
          <p className='noTask'>No tasks available : )</p>
        )}
      </div>

      <div className='pagination'>
        {renderPaginationButtons()}
      </div>

      <div className='buttons'>
        <button className='newTask' onClick={openAddTaskPopup}>Add Task</button>
        <button className='getReport' onClick={generateReport}>Generate Report</button>
        {isPopupOpen && <PopupForm closePopup={closeAddTaskPopup} />}
      </div>

      {taskToUpdate && (
        <UpdateTaskForm task={taskToUpdate} closePopup={closeUpdateForm} />
      )}
    </section>
  );
};

export default TaskSection;
