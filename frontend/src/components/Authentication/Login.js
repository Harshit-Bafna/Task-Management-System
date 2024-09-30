import React, { useState, useEffect } from 'react';
import loginImg from '../../assets/log.svg';
import '../../styles/Authntication/auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFail, clearError } from '../../redux/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BACKEND_LINK; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 10000); 
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      dispatch(loginSuccess(token));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFail('Invalid email or password'));
    }
  };

  return (
    <section className='Auth'>
      <div className='left'>
        <img src={loginImg} alt='Login' />
      </div>

      <div className='right'>
        <form className='authForm' onSubmit={handleSubmit}>
          <p className='title'>Login</p>

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

          {error && <p className='errorMessage'>{error}</p>}

          <button className='authSubmit' type="submit">Login</button>
          <span className='redirect'>Not a member? <Link to='/register'>Sign Up</Link></span>
        </form>
      </div>
    </section>
  );
};

export default Login;
