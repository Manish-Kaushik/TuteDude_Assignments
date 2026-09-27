# To-Do List API – Part 1

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup
1. Open the `backend` folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your MongoDB Atlas connection string to `MONGODB_URI`.
5. Run `npm run dev` or `npm start`.

API base URL:
`http://localhost:5000`

## Endpoints
- GET `/api/tasks`
- GET `/api/tasks/:id`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- PATCH `/api/tasks/:id/status`
- DELETE `/api/tasks/:id`

## Example POST body
```json
{
  "title": "Complete assignment",
  "description": "Finish the TuteDude task",
  "completed": false
}
```

## Notes
Keep `.env` private and do not upload database credentials to GitHub.
