const services = [
    { id: 1, name: "Dry Cleaning", price: 200 },
    { id: 2, name: "Wash & Fold", price: 250 },
    { id: 3, name: "Ironing", price: 120 },
    { id: 4, name: "Stain Removal", price: 500 },
    { id: 5, name: "Leather & Suede Cleaning", price: 999 },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800 }
];

let cart = [];

const servicesList = document.getElementById("servicesList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");

function renderServices() {
    servicesList.innerHTML = services.map(function(service) {
        return `
            <div class="service-item">
                <span class="service-name">✿ ${service.name}</span>
                <span class="service-price">₹${service.price.toFixed(2)}</span>
                <button class="add-btn" onclick="addItem(${service.id})">Add Item ⊕</button>
            </div>
        `;
    }).join("");
}

function addItem(id) {
    const service = services.find(function(item) {
        return item.id === id;
    });

    if (!service) return;

    const alreadyAdded = cart.some(function(item) {
        return item.id === id;
    });

    if (alreadyAdded) {
        alert("This service is already in your cart.");
        return;
    }

    cart.push(service);
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    renderCart();
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">No items Added</p>';
    } else {
        cartItems.innerHTML = cart.map(function(item, index) {
            return `
                <div class="cart-row">
                    <span>${index + 1}</span>
                    <span>${item.name}</span>
                    <span>₹${item.price.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            `;
        }).join("");
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    totalAmount.textContent = "₹" + total.toFixed(2);
}

function getBookingDetails() {
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    return { name, email, phone };
}

function sendBookingEmail(details) {
    /*
      EmailJS setup:
      1. Create an account at https://www.emailjs.com/
      2. Replace the three placeholder values below.
      3. Create an email template with these variables:
         {{name}}, {{email}}, {{phone}}, {{services}}, {{total}}
    */

    const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
    const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";

    if (
        PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY" ||
        SERVICE_ID === "YOUR_EMAILJS_SERVICE_ID" ||
        TEMPLATE_ID === "YOUR_EMAILJS_TEMPLATE_ID"
    ) {
        return Promise.resolve(false);
    }

    emailjs.init({
        publicKey: PUBLIC_KEY
    });

    const serviceNames = cart.map(function(item) {
        return item.name;
    }).join(", ");

    return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: details.name,
        email: details.email,
        phone: details.phone,
        services: serviceNames,
        total: totalAmount.textContent
    }).then(function() {
        return true;
    });
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add at least one service to the cart.");
        return;
    }

    const details = getBookingDetails();

    sendBookingEmail(details)
        .then(function(emailSent) {
            const message = document.getElementById("bookingMessage");

            if (emailSent) {
                message.textContent =
                    "Thank you for booking the service. A confirmation email has been sent.";
            } else {
                message.textContent =
                    "Thank you for booking the service. We will get back to you soon!";
            }

            cart = [];
            renderCart();
            document.getElementById("bookingForm").reset();
        })
        .catch(function(error) {
            console.error("EmailJS error:", error);

            document.getElementById("bookingMessage").textContent =
                "Booking received. Email confirmation could not be sent right now.";
        });
});

document.getElementById("heroBookBtn").addEventListener("click", function() {
    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("subscriberName").value.trim();

    alert("Thank you, " + name + "! You have subscribed to our newsletter.");
    this.reset();
});

renderServices();
renderCart();
