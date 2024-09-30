# Task Management System

A full-featured Task Management System designed with a **Node.js** backend and a **React.js** frontend. This application supports user authentication, task management, and role-based access control (admin/user). The system enables users to manage tasks, with search functionality, and allows admins to manage user assignments.

## Features

- User registration and login with **JWT authentication**.
- Role-based access (Admin/User).
- Task creation, update, and management.
- Task search functionality.
- Admin functionality to assign tasks to users.
- User-friendly interface built with **React.js**.
- **Redux** for state management.
- **Axios** for API requests.
- Secure password storage using **bcrypt**.

## Tech Stack

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend:
- **React.js** (with hooks and props)
- **Redux** for global state management
- **Axios** for HTTP requests
- **HTML5/CSS3** for styling

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - User login and JWT generation.
- `POST /api/auth/logout` - Logout the current user.

### Task Routes
- `GET /api/tasks` - Fetch tasks for the logged-in user.
- `POST /api/tasks` - Create a new task (Admin only).
- `PUT /api/tasks/:id` - Update a task.
- `DELETE /api/tasks/:id` - Delete a task (Admin only).

### User Routes (Admin only)
- `GET /api/users` - Get all users.
- `GET /api/users/:id` - Get a user by ID.
- `PUT /api/users/:id` - Update user information.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Harshit-Bafna/Task-Management-System.git
    cd Task-Management-System
    ```

2. **Install dependencies for the backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Create a `.env` file in the backend directory with the following content:**

    ```bash
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. **Run the backend server:**

    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

7. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

```bash
Task-Management-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.js
│   └── public/
└── README.md
