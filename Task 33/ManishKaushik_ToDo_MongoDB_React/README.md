# TuteDude – To-Do List MongoDB + React Integration

This project covers both parts shown in the assignment:

## Part 1 – Backend
Node.js + Express.js + MongoDB/Mongoose REST API.

## Part 2 – Frontend
React frontend integrated with the backend API using Axios.

## Folder Structure

```text
backend/
  server.js
  package.json
  .env.example
  README.md

frontend/
  src/
    App.jsx
    main.jsx
    styles.css
  package.json
  vite.config.js
  .env.example
  README.md
```

## Run locally

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Add your MongoDB Atlas URI to `backend/.env`.

### Frontend
Open another terminal:
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

For the frontend `.env`, use:
```text
VITE_API_URL=http://localhost:5000/api
```

## API Features
- Retrieve all tasks
- Retrieve one task
- Create a task
- Update task details
- Update completion status
- Delete a task

## Challenges / Solutions
- MongoDB connection is kept in environment variables.
- API validation rejects empty task titles.
- Frontend displays loading and error states.
- CORS is configured so the React frontend can communicate with the Express backend.
- React state is updated immediately after successful API operations.

## Deployment
For deployment, host the backend and frontend separately if desired. Set the production frontend URL in the backend CORS configuration and set the deployed backend API URL in the frontend `VITE_API_URL` environment variable.

Do not commit `.env` files or database credentials.
