import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import "./style.css";

function Layout({ children }) {
  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="logo">✦ RouteApp</Link>

        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </nav>
      </header>

      <main>{children}</main>

      <footer>React Router DOM • Task 27</footer>
    </div>
  );
}

function Home() {
  return (
    <section className="hero">
      <div>
        <span className="badge">React Router DOM</span>
        <h1>Navigate between pages with ease.</h1>
        <p>
          A simple React application demonstrating navigation between
          Home, Dashboard, Login and Signup routes.
        </p>

        <div className="actions">
          <Link className="button primary" to="/dashboard">
            Open Dashboard
          </Link>
          <Link className="button secondary" to="/login">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="page-card">
      <span className="badge">Dashboard</span>
      <h1>Welcome to your Dashboard</h1>
      <p>Here you can view your application information and activity.</p>

      <div className="info-grid">
        <div><strong>12</strong><span>Projects</span></div>
        <div><strong>08</strong><span>Tasks</span></div>
        <div><strong>94%</strong><span>Progress</span></div>
      </div>
    </section>
  );
}

function Login() {
  return (
    <section className="form-card">
      <h1>Login</h1>
      <p>Enter your details to access your account.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Email</label>
        <input type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input type="password" placeholder="••••••••" />

        <button className="button primary" type="submit">Login</button>
      </form>

      <p className="small">
        Don't have an account? <Link to="/signup">Create one</Link>
      </p>
    </section>
  );
}

function Signup() {
  return (
    <section className="form-card">
      <h1>Create Account</h1>
      <p>Sign up to start using the application.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Full Name</label>
        <input type="text" placeholder="Your name" />

        <label>Email</label>
        <input type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input type="password" placeholder="Create a password" />

        <button className="button primary" type="submit">Sign Up</button>
      </form>

      <p className="small">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page-card center">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="button primary" to="/">Back Home</Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
