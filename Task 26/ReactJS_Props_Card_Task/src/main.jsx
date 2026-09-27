import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const cards = [
  {
    id: 1,
    title: "Card 1",
    description: "This is card 1 description.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is card 2 description.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is card 3 description.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Card 4",
    description: "This is card 4 description.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Card 5",
    description: "This is card 5 description.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Card 6",
    description: "This is card 6 description.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80"
  }
];

function Card({ title, description, image }) {
  return (
    <article className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}

function App() {
  return (
    <main className="page">
      <h1>All the cards are here.</h1>

      <section className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
