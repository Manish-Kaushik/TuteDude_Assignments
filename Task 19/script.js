const services = [
    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Washing Service",
        price: 150,
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Home Cleaning",
        price: 500,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Car Wash",
        price: 350,
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=400&q=80"
    }
];

let cart = [];

const servicesList = document.getElementById("servicesList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const emptyMessage = document.getElementById("emptyMessage");

function displayServices() {
    servicesList.innerHTML = "";

    services.forEach(function(service) {
        const card = document.createElement("div");
        card.className = "service-card";

        card.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <div class="service-content">
                <h3>${service.name}</h3>
                <div class="price">₹${service.price.toFixed(2)}</div>
                <div class="service-actions">
                    <button class="skip-btn" onclick="skipService(${service.id})">Skip Item</button>
                    <button class="add-btn" onclick="addToCart(${service.id})">Add Item</button>
                </div>
            </div>
        `;

        servicesList.appendChild(card);
    });
}

function addToCart(serviceId) {
    const service = services.find(function(item) {
        return item.id === serviceId;
    });

    if (service && !cart.some(function(item) {
        return item.id === serviceId;
    })) {
        cart.push(service);
        updateCart();
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(function(item) {
        return item.id !== serviceId;
    });

    updateCart();
}

function skipService(serviceId) {
    const card = document.querySelector(`.service-card button[onclick="skipService(${serviceId})"]`).closest(".service-card");
    card.style.opacity = "0.45";

    setTimeout(function() {
        card.style.opacity = "1";
    }, 600);
}

function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No items Added";
        cartItems.appendChild(message);
    } else {
        cart.forEach(function(item, index) {
            const row = document.createElement("div");
            row.className = "cart-item";

            row.innerHTML = `
                <span>${index + 1}</span>
                <span>${item.name}</span>
                <span>₹${item.price.toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
            `;

            cartItems.appendChild(row);
        });
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    totalAmount.textContent = "₹" + total.toFixed(2);
}

document.getElementById("addSelectedBtn").addEventListener("click", function() {
    if (services.length > 0) {
        addToCart(services[0].id);
    }
});

document.getElementById("bookSelectedBtn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Please add at least one service to the cart.");
        return;
    }

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add a service before booking.");
        return;
    }

    const name = document.getElementById("fullName").value;
    alert("Booking confirmed for " + name + "!");
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    alert("User logged out.");
});

displayServices();
updateCart();
