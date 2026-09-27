import React from "react";
import ReactDOM from "react-dom/client";
import useFetch from "./useFetch";
import "./style.css";

const API_URL = "https://jsonplaceholder.typicode.com/photos?_limit=8";

function App() {
  const { data, loading, error } = useFetch(API_URL);

  return (
    <main className="page">
      <header>
        <h1>Photos</h1>
        <p>Data fetched using a reusable <strong>useFetch</strong> custom hook.</p>
      </header>

      {loading && <div className="message">Loading photos...</div>}

      {error && (
        <div className="message error">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <section className="photo-grid">
          {data?.map((photo) => (
            <article className="photo-card" key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
