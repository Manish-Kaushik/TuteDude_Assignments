import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const shoes = [
  {
    id: 1,
    name: "Campus Men's Sneakers",
    price: 50,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Campus Men's OG Sneakers",
    price: 75,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Classic Running Shoes",
    price: 65,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Everyday Casual Shoes",
    price: 55,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((current) => {
      const found = current.find((item) => item.id === shoe.id);
      if (found) {
        return current.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...shoe, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">👟 ShoeStore</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Categories</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <main id="home" className="container">
        <section className="hero">
          <h1>ReactJS Hooks Shoe Store</h1>
          <p>Browse shoes and manage your shopping cart using React useState.</p>
        </section>

        <section id="products" className="store-layout">
          <div className="products">
            <h2>Available Shoes</h2>
            <div className="shoe-grid">
              {shoes.map((shoe) => (
                <article className="shoe-card" key={shoe.id}>
                  <img src={shoe.image} alt={shoe.name} />
                  <h3>{shoe.name}</h3>
                  <p className="price">${shoe.price}</p>
                  <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                </article>
              ))}
            </div>
          </div>

          <aside className="cart">
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p className="empty">Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>${item.price} × {item.quantity}</span>
                    </div>
                    <button
                      className="remove"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="total">Total: ${total.toFixed(2)}</div>
          </aside>
        </section>
      </main>

      <footer id="about">Simple ReactJS Hooks project using useState</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
