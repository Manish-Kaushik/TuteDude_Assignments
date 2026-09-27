# To-Do List App – REST API Plan

## Objective
Plan the RESTful APIs required for a To-Do List application using Express.js. This task focuses on API identification and design; implementation can be done in a later task.

## 1. Add Task

**Endpoint:** `POST /api/tasks`

**Purpose:** Create a new task.

**Request Body:**
```json
{
  "title": "Complete React assignment",
  "description": "Finish the task and submit it",
  "completed": false
}
```

**Logic:**
- Validate that `title` is provided.
- Generate a unique task ID on the server.
- Set `completed` to `false` by default when it is not provided.
- Store the task.

**Expected Response – 201 Created:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "task_001",
    "title": "Complete React assignment",
    "description": "Finish the task and submit it",
    "completed": false
  }
}
```

**Reason:** POST is appropriate because a new resource is being created.

---

## 2. Get All Tasks

**Endpoint:** `GET /api/tasks`

**Purpose:** Return all tasks.

**Request Body:** None.

**Expected Response – 200 OK:**
```json
{
  "tasks": [
    {
      "id": "task_001",
      "title": "Complete React assignment",
      "description": "Finish the task and submit it",
      "completed": false
    }
  ]
}
```

**Reason:** GET is used to retrieve resources.

---

## 3. Get One Task

**Endpoint:** `GET /api/tasks/:id`

**Purpose:** Return details of a specific task.

**Example:** `GET /api/tasks/task_001`

**Request Body:** None.

**Expected Response – 200 OK:**
```json
{
  "task": {
    "id": "task_001",
    "title": "Complete React assignment",
    "description": "Finish the task and submit it",
    "completed": false
  }
}
```

**If task does not exist – 404 Not Found:**
```json
{
  "message": "Task not found"
}
```

**Reason:** The ID identifies the individual resource.

---

## 4. Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Purpose:** Update an existing task.

**Request Body:**
```json
{
  "title": "Complete React assignment",
  "description": "Finish and submit today",
  "completed": true
}
```

**Expected Response – 200 OK:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "task_001",
    "title": "Complete React assignment",
    "description": "Finish and submit today",
    "completed": true
  }
}
```

**Reason:** PUT is used to update an existing resource.

---

## 5. Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Purpose:** Delete a task.

**Request Body:** None.

**Expected Response – 200 OK:**
```json
{
  "message": "Task deleted successfully"
}
```

**If task does not exist – 404 Not Found:**
```json
{
  "message": "Task not found"
}
```

**Reason:** DELETE is specifically intended for removing a resource.

---

## 6. Mark Task Complete / Incomplete

**Endpoint:** `PATCH /api/tasks/:id`

**Purpose:** Partially update the task status.

**Request Body:**
```json
{
  "completed": true
}
```

**Expected Response – 200 OK:**
```json
{
  "message": "Task status updated successfully",
  "task": {
    "id": "task_001",
    "completed": true
  }
}
```

**Reason:** PATCH is suitable for changing only part of an existing resource.

---

# CRUD Overview

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Create task | POST | `/api/tasks` |
| Read all tasks | GET | `/api/tasks` |
| Read one task | GET | `/api/tasks/:id` |
| Update task | PUT | `/api/tasks/:id` |
| Partially update status | PATCH | `/api/tasks/:id` |
| Delete task | DELETE | `/api/tasks/:id` |

These endpoints collectively cover the main CRUD operations required by a To-Do List application.

# Common Validation / Error Responses

### 400 Bad Request
Used when required data is missing or invalid.

```json
{
  "message": "Title is required"
}
```

### 404 Not Found
Used when a requested task ID does not exist.

```json
{
  "message": "Task not found"
}
```

### 500 Internal Server Error
Used for unexpected server-side errors.

```json
{
  "message": "Internal server error"
}
```

# Potential Implementation Challenges

1. **Unique IDs:** The server must generate IDs that do not collide.
2. **Validation:** Empty titles and invalid values should be rejected.
3. **Data persistence:** A database or suitable storage is needed so tasks are not lost after a server restart.
4. **Concurrent updates:** Two requests updating the same task should not accidentally overwrite each other.
5. **Error handling:** Every route should return clear HTTP status codes and useful JSON messages.
6. **CORS:** If the React frontend and Express API run on different origins, CORS configuration may be required.
7. **Authentication:** If the app later supports multiple users, tasks should be associated with authenticated users.

# Design Notes

The API uses the common REST pattern `/api/tasks` for the collection and `/api/tasks/:id` for an individual task. JSON is used for request and response bodies. HTTP methods describe the requested operation, keeping the API simple and predictable.
