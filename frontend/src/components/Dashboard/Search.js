import React, { useState } from 'react';
import '../../styles/Dashboard/search.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm); 
    };

    return (
        <section className='searchSection'>
            <div className='search'>
                <input
                    className='searchBar'
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Search tasks...'
                />
                <button className='searchButton' onClick={handleSearchSubmit}>
                    <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
                </button>
            </div>
        </section>
    );
};

export default Search;
