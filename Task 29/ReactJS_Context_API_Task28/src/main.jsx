import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { CartProvider, useCart } from "./CartContext";
import "./style.css";

const products = [
  {
    id: 1,
    name: "White Casual Sneaker",
    price: 70,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Urban Running Shoe",
    price: 85,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Classic Black Sneaker",
    price: 75,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Street High Top",
    price: 90,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80"
  }
];

function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <Link className="brand" to="/">ShoeMart</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/payment" className="cart-link">
          Cart <span>{itemCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <strong>${product.price}</strong>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </article>
  );
}

function Home() {
  const { cart, total, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <div>
          <span>CONTEXT API • REACT</span>
          <h1>Step into your<br />next favorite pair.</h1>
          <p>Choose your shoes and manage your cart using React Context API.</p>
        </div>
      </section>

      <section className="store">
        <div className="products">
          <div className="section-title">
            <h2>Featured Shoes</h2>
            <p>Simple collection for everyday style.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <aside className="cart">
          <div className="cart-head">
            <h2>Your Cart</h2>
            <span>{cart.length} products</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty">
              <div>🛒</div>
              <p>Your cart is empty.</p>
              <small>Add a shoe to continue.</small>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>${item.price} × {item.quantity}</p>
                    <div className="quantity">
                      <button onClick={() => decreaseQuantity(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="cart-total">
            <div>
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => navigate("/payment")}
            >
              Proceed to Payment →
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Payment() {
  const { cart, total, decreaseQuantity, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = (event) => {
    event.preventDefault();
    alert("Payment successful! Thank you for your order.");
  };

  return (
    <main className="payment-page">
      <div className="payment-container">
        <button className="back" onClick={() => navigate("/")}>
          ← Back to Shopping
        </button>

        <div className="payment-grid">
          <section className="payment-card">
            <span className="label">CHECKOUT</span>
            <h1>Complete your payment</h1>
            <p className="muted">Enter your card details to place the order.</p>

            <form onSubmit={handlePayment}>
              <label>Cardholder Name</label>
              <input required placeholder="Manish Kaushik" />

              <label>Card Number</label>
              <input required maxLength="19" placeholder="1234 5678 9012 3456" />

              <div className="two">
                <div>
                  <label>Expiry Date</label>
                  <input required placeholder="MM/YY" />
                </div>
                <div>
                  <label>CVV</label>
                  <input required maxLength="4" placeholder="123" />
                </div>
              </div>

              <button className="pay-button" disabled={cart.length === 0}>
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </section>

          <aside className="order-card">
            <h2>Order Summary</h2>

            {cart.length === 0 ? (
              <p className="muted">No items in your cart.</p>
            ) : (
              cart.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <small>${item.price} × {item.quantity}</small>
                    <div className="mini-actions">
                      <button onClick={() => decreaseQuantity(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                      <button className="delete" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <footer>React Context API • ShoeMart Task</footer>
      </CartProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
