# Task 34 – Schema Reference Backend

## Objective
Demonstrate a Mongoose schema reference where each Post document references a User.

## Schemas

### User
- name
- email

### Post
- title
- content
- user -> ObjectId reference to User

## API Routes

### POST /users
Creates a user.

Example:
```json
{
  "name": "Manish",
  "email": "manish@example.com"
}
```

### POST /posts
Creates a post linked to a user.

Example:
```json
{
  "title": "My First Post",
  "content": "Hello from MongoDB references.",
  "userId": "USER_OBJECT_ID"
}
```

### GET /posts
Returns all posts with user information using Mongoose `populate()`.

### GET /users
Returns all users.

## Run
```bash
npm install
```

Copy `.env.example` to `.env`, add the MongoDB Atlas URI, then:

```bash
npm run dev
```
