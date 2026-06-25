# 🚀 Monolith Task Management

A modern full-stack **Task Management Application** built with **React, TypeScript, Express.js, PostgreSQL, Drizzle ORM, and JWT Authentication**. The application allows users to securely manage their daily tasks with authentication, CRUD operations, task filtering, status updates, and a responsive user interface.

---

## 🌐 Live Demo

### Frontend
🔗 https://monolith-task-managment.vercel.app/

### Backend API
🔗 https://monolith-task-managment.onrender.com/

---

# ✨ Features

- 🔐 JWT Authentication (Register & Login)
- 🔒 Protected Routes
- ✅ Create Tasks
- 📝 Edit Tasks
- 🗑 Delete Tasks
- 🔄 Update Task Status
- 🔍 Search Tasks
- 🎯 Filter Tasks by Status
- 📱 Fully Responsive UI
- ⚡ RTK Query for API State Management
- 🐳 Dockerized Backend
- ☁️ Production Deployment (Render + Vercel)

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router DOM
- Tailwind CSS
- Lucide React
- Sonner

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- JWT Authentication
- Zod Validation
- Bcrypt
- Docker

---

# 📂 Project Structure

```
Monolith-task-managment/
│
├── task-management-web/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── task-managment-api/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── README.md
```

---

# 🔑 Authentication

- User Registration
- User Login
- JWT Token Authentication
- Protected APIs
- Password Hashing using Bcrypt

---

# 📋 Task Features

- Create a Task
- View All Tasks
- Update Task
- Delete Task
- Update Task Status
- Search Tasks
- Filter by Status
- Responsive Dashboard

---

# 🗄 Database

### Users

| Field | Type |
|-------|------|
| id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| createdAt | TIMESTAMP |

### Tasks

| Field | Type |
|-------|------|
| id | UUID |
| title | VARCHAR |
| description | TEXT |
| status | ENUM |
| userId | UUID |
| createdAt | TIMESTAMP |
| updatedAt | TIMESTAMP |

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/task/get |
| POST | /api/task/add |
| PUT | /api/task/update/:id |
| DELETE | /api/task/delete/:id |

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

DB_URL=YOUR_NEON_DATABASE_URL

ACCESS_SECRET=YOUR_SECRET_KEY

ORIGIN_FRONTEND=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://monolith-task-managment.onrender.com/api
```

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/Nayan-Bera/Monolith-task-managment.git
```

---

## Backend Setup

```bash
cd task-managment-api

npm install

npm run generate

npm run migrate

npm run dev
```

---

## Frontend Setup

```bash
cd task-management-web

npm install

npm run dev
```

---

# 🐳 Docker

## Build

```bash
docker build -t task-management-api .
```

## Run

```bash
docker run -p 5000:5000 task-management-api
```

---

# 🚀 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- Neon PostgreSQL

---

# 📸 Screenshots

> Add screenshots of:
>
> - Login
> - Register
> - Dashboard
> - Create Task
> - Edit Task
> - Task Status Update

---

# 📈 Future Improvements

- Pagination
- Due Dates
- Task Priorities
- User Profile
- Email Verification
- Password Reset
- Refresh Token Authentication
- Drag & Drop Tasks
- Dark Mode

---

# 👨‍💻 Author

**Nayan Kr Bera**

GitHub: https://github.com/Nayan-Bera

LinkedIn: https://www.linkedin.com/in/nayan-kr-bera/

Portfolio: https://www.nayanbera.in

---

## ⭐ If you found this project helpful, consider giving it a Star!