import React, { useState } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Header from './Header';
import TaskSection from './TaskSection';
import UtilityList from './UtilityList';
import PopupForm from './PopupForm';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        priority: '',
        status: '',
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false); 

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'clear') {
            setFilters({ priority: '', status: '' });
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterType]: value,
            }));
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <Navbar />
            <Header />
            <Search onSearch={handleSearch} />
            <UtilityList onFilterChange={handleFilterChange} />
            <TaskSection searchTerm={searchTerm} filters={filters} openPopup={openPopup} />
            {isPopupOpen && <PopupForm closePopup={closePopup} />} 
        </>
    );
};

export default Dashboard;
