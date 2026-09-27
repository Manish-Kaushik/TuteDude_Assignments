import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL
});

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postUserId, setPostUserId] = useState("");

  const [message, setMessage] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      if (!postUserId && response.data.length > 0) {
        setPostUserId(response.data[0]._id);
      }
    } catch {
      setMessage("Could not load users.");
    }
  };

  const loadPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch {
      setMessage("Could not load posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    if (!userName.trim() || !userEmail.trim()) return;

    try {
      const response = await api.post("/users", {
        name: userName,
        email: userEmail
      });

      setUsers((current) => [response.data, ...current]);
      setPostUserId(response.data._id);
      setUserName("");
      setUserEmail("");
      setMessage("User created successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not create user.");
    }
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!postTitle.trim() || !postContent.trim() || !postUserId) {
      setMessage("Please fill all post fields and select a user.");
      return;
    }

    try {
      const response = await api.post("/posts", {
        title: postTitle,
        content: postContent,
        userId: postUserId
      });

      setPosts((current) => [response.data, ...current]);
      setPostTitle("");
      setPostContent("");
      setMessage("Post created and linked to the user.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not create post.");
    }
  };

  return (
    <main className="page">
      <section className="container">
        <header className="hero">
          <span>MongoDB + Mongoose + React</span>
          <h1>Schema Reference</h1>
          <p>
            Create users, create posts linked to users, and view populated
            user information.
          </p>
        </header>

        {message && <div className="message">{message}</div>}

        <section className="forms">
          <form className="card" onSubmit={createUser}>
            <h2>Create User</h2>
            <p className="hint">User schema: name + email</p>

            <label>Name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter user name"
            />

            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter email"
            />

            <button type="submit">Add User</button>
          </form>

          <form className="card" onSubmit={createPost}>
            <h2>Create Post</h2>
            <p className="hint">Post references a User document</p>

            <label>Title</label>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Post title"
            />

            <label>Content</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write post content"
              rows="4"
            />

            <label>Author</label>
            <select
              value={postUserId}
              onChange={(e) => setPostUserId(e.target.value)}
            >
              {users.length === 0 ? (
                <option value="">Create a user first</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} — {user.email}
                  </option>
                ))
              )}
            </select>

            <button type="submit" disabled={users.length === 0}>
              Add Post
            </button>
          </form>
        </section>

        <section className="posts-section">
          <div className="section-heading">
            <div>
              <h2>All Posts</h2>
              <p>Posts with user information populated from MongoDB.</p>
            </div>
            <button className="outline" onClick={loadPosts}>
              Refresh
            </button>
          </div>

          {loadingPosts ? (
            <div className="empty">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="empty">
              No posts yet. Create a user and then add a post.
            </div>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <article className="post" key={post._id}>
                  <div className="post-top">
                    <span>POST</span>
                    <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>

                  <div className="author">
                    <div className="avatar">
                      {(post.user?.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong>{post.user?.name || "Unknown User"}</strong>
                      <small>{post.user?.email || "No email"}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;