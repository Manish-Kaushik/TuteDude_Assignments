// Get elements from the DOM
const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const greetButton = document.getElementById("greetButton");
const colorBoxes = document.querySelectorAll(".color-box");

// Change greeting text when button is clicked
greetButton.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (name === "") {
        greeting.textContent = "Hello";
    } else {
        greeting.textContent = "Hello, " + name;
    }
});

// Change each box's background color when clicked
colorBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
        const selectedColor = box.getAttribute("data-color");
        box.style.backgroundColor = selectedColor;

        // Keep the text visible on darker backgrounds
        if (selectedColor === "yellow") {
            box.style.color = "#222";
        } else {
            box.style.color = "white";
        }
    });
});
