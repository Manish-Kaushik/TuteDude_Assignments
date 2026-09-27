# TuteDude Task 34 – Schema Reference

## Problem covered
Create an Express.js application with MongoDB/Mongoose where one schema references another.

### User Schema
- name
- email

### Post Schema
- title
- content
- user (ObjectId reference to User)

### Backend routes
- POST `/users`
- POST `/posts`
- GET `/posts`
- GET `/users`

`GET /posts` uses Mongoose `populate()` to return user information with each post.

## React frontend
The frontend provides:
- User input form
- Post input form
- Author selection
- POST requests
- Posts list
- Populated user information

## Run the project

### Backend
```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=http://localhost:5173
```

Run:
```bash
npm run dev
```

### Frontend
In another terminal:
```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```text
VITE_API_URL=http://localhost:5000
```

Run:
```bash
npm run dev
```

## Important
Do not upload `.env` or database passwords to GitHub.
