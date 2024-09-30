import React from 'react'
import '../../styles/Dashboard/header.css'

const Header = () => {
  return (
    <div className='header'>
        <p className='heading'>Organize. Prioritize. Achieve.</p>

        <p className='description'>
            Welcome to your personal task manager! Keep track of your daily to-dos, prioritize important tasks, and 
            stay on top of deadlines. With real-time updates and easy collaboration, managing tasks has never been easier. 
            Search through your tasks, filter by priority or status, and accomplish your goals step by step. 
            Let’s make your productivity soar!
        </p>
    </div>
  )
}

export default Header