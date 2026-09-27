import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch {
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await api.post("/tasks", {
        title,
        description,
        completed: false
      });

      setTasks((current) => [response.data, ...current]);
      setTitle("");
      setDescription("");
      setError("");
    } catch {
      setError("Could not add the task.");
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await api.patch(`/tasks/${task._id}/status`, {
        completed: !task.completed
      });

      setTasks((current) =>
        current.map((item) =>
          item._id === task._id ? response.data : item
        )
      );
    } catch {
      setError("Could not update task status.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch {
      setError("Could not delete the task.");
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;

    try {
      const response = await api.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription
      });

      setTasks((current) =>
        current.map((task) =>
          task._id === id ? response.data : task
        )
      );

      setEditingId(null);
    } catch {
      setError("Could not update the task.");
    }
  };

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return tasks;

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query)
    );
  }, [tasks, search]);

  return (
    <main className="page">
      <section className="app-card">
        <header className="header">
          <div>
            <p className="eyebrow">React + Express + MongoDB</p>
            <h1>Task Manager</h1>
            <p className="subtitle">Manage your daily tasks from one place.</p>
          </div>
          <div className="count">{tasks.length} Tasks</div>
        </header>

        <form className="add-form" onSubmit={addTask}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="toolbar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />
          <button type="button" className="secondary" onClick={loadTasks}>
            Refresh
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="empty">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty">No tasks found.</div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <article className={`task ${task.completed ? "done" : ""}`} key={task._id}>
                {editingId === task._id ? (
                  <div className="edit-box">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <div className="actions">
                      <button onClick={() => saveEdit(task._id)}>Save</button>
                      <button
                        className="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-main">
                      <button
                        className={`check ${task.completed ? "checked" : ""}`}
                        onClick={() => toggleTask(task)}
                        aria-label="Toggle task"
                      >
                        {task.completed ? "✓" : ""}
                      </button>
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.description || "No description"}</p>
                      </div>
                    </div>

                    <div className="actions">
                      <button className="secondary" onClick={() => startEdit(task)}>
                        Edit
                      </button>
                      <button className="danger" onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;