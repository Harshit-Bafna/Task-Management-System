import React, { useState } from 'react';
import '../../styles/Dashboard/utilityList.css';

const UtilityList = ({ onFilterChange }) => {
    const [activeFilters, setActiveFilters] = useState({ priority: '', status: '' });

    const handleFilterClick = (filterType, value) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value === prevFilters[filterType] ? '' : value, 
        }));

        onFilterChange(filterType, value === activeFilters[filterType] ? '' : value);
    };

    const isActive = (filterType, value) => {
        return activeFilters[filterType] === value;
    };

    return (
        <section className='Utility'>
            <p className='title'>
                <i className="fa-solid fa-filter"></i>
                Filters
            </p>
            <div className='priorityStatus'>
                <p>Priority: </p>
                <button
                    className={isActive('priority', 'High') ? 'active' : ''}
                    onClick={() => handleFilterClick('priority', 'High')}
                >
                    High
                </button>
                <button
                    className={isActive('priority', 'Medium') ? 'active' : ''}
                    onClick={() => handleFilterClick('priority', 'Medium')}
                >
                    Medium
                </button>
                <button
                    className={isActive('priority', 'Low') ? 'active' : ''}
                    onClick={() => handleFilterClick('priority', 'Low')}
                >
                    Low
                </button>
            </div>
            <div className='priorityStatus'>
                <p>Status: </p>
                <button
                    className={isActive('status', 'To Do') ? 'active' : ''}
                    onClick={() => handleFilterClick('status', 'To Do')}
                >
                    To Do
                </button>
                <button
                    className={isActive('status', 'In Progress') ? 'active' : ''}
                    onClick={() => handleFilterClick('status', 'In Progress')}
                >
                    In Progress
                </button>
                <button
                    className={isActive('status', 'Completed') ? 'active' : ''}
                    onClick={() => handleFilterClick('status', 'Completed')}
                >
                    Completed
                </button>
            </div>
            <button
                className={isActive('clear', '') ? 'active' : ''}
                onClick={() => handleFilterClick('clear', '')}
            >
                Clear All
            </button>
        </section>
    );
};

export default UtilityList;
