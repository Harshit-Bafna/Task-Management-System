import React, { useState } from 'react';
import registerImg from '../../assets/register.svg';
import '../../styles/Authntication/auth.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://task-management-system-backend-d8ea.onrender.com/api/auth/register`, {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <section className='Auth'>
      <div className='left'>
        <img src={registerImg} alt='Register' />
      </div>

      <div className='right'>
        <form className='authForm' onSubmit={handleSubmit}>
          <p className='title'>Sign Up</p>

          <div>
            <label className='formLabel' htmlFor="name">
              <i className="fa-regular fa-user"></i>Name
            </label>
            <input
              className='formInput'
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete='off'
              placeholder='Full Name'
              required
            />
          </div>

          <div>
            <label className='formLabel' htmlFor="email">
              <i className="fa-regular fa-envelope"></i>Email
            </label>
            <input
              className='formInput'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              placeholder='Email'
              required
            />
          </div>

          <div>
            <label className='formLabel' htmlFor="password">
              <i className="fa-solid fa-lock"></i>Password
            </label>
            <input
              className='formInput'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
              placeholder='Password'
              required
            />
          </div>

          <button className='authSubmit' type="submit">Sign Up</button>
          <span className='redirect'>Already a member? <Link to='/login'>Log In</Link></span>
        </form>
      </div>
    </section>
  );
};

export default Register;
