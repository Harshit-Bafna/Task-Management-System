import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard/navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <nav className='navbar'>
      <div className="wrapper">
        <div className="top">Task Manager</div>
        <div className="bottom" aria-hidden="true">Task Manager</div>
      </div>
      <button className='logoutButton' onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
