import './App.css';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const authToken = useSelector((state) => state.auth.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={authToken ? <Navigate to='/dashboard' /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={authToken ? <Navigate to='/dashboard' /> : <Login />}
        />
        <Route
          path='/register'
          element={authToken ? <Navigate to='/dashboard' /> : <Register />}
        />
        <Route
          path='/dashboard'
          element={authToken ? <Dashboard /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
