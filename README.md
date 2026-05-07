# SkillSync

## Folder Structure

```
skillsync/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── availabilityController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── availabilityRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── api.js
    │   └── app.js
    ├── availability.html
    ├── browse-students.html
    ├── company-dashboard.html
    ├── create-task.html
    ├── index.html
    ├── login.html
    ├── project.html
    ├── register.html
    ├── student-dashboard.html
    └── student-profile.html
```

## Running the project

### 1. Start MongoDB
Make sure MongoDB is running locally:
- Windows: start the MongoDB service or run `mongod` in terminal
- Mac: `brew services start mongodb-community`

### 2. Start the Backend
```
cd Backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### 3. Open the Frontend
Open `Frontend/index.html` in your browser using Live Server (VS Code extension)
or any static file server on port 5500.

## API Endpoints

| Method | Route                    | Auth | Role    |
|--------|--------------------------|------|---------|
| POST   | /api/auth/register       | No   | —       |
| POST   | /api/auth/login          | No   | —       |
| GET    | /api/users/me            | Yes  | any     |
| PUT    | /api/users/me            | Yes  | student |
| GET    | /api/users/students      | Yes  | any     |
| GET    | /api/users/students/:id  | Yes  | any     |
| POST   | /api/tasks               | Yes  | company |
| GET    | /api/tasks               | Yes  | company |
| GET    | /api/tasks/:id           | Yes  | any     |
| POST   | /api/tasks/assign        | Yes  | company |
| PUT    | /api/tasks/:id/status    | Yes  | company |
| PATCH  | /api/availability        | Yes  | student |
