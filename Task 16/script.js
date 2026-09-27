const students = [
    {
        name: "Salman Ahmed",
        marks: 38,
        class: "3rd",
        address: "India"
    },
    {
        name: "Riya Sharma",
        marks: 85,
        class: "10th",
        address: "123, ABC Colony, Delhi"
    },
    {
        name: "Rohit Patel",
        marks: 70,
        class: "7th",
        address: "456, XYZ Street, Mumbai"
    },
    {
        name: "Priya Singh",
        marks: 95,
        class: "8th",
        address: "789, PQR Nagar, Bangalore"
    },
    {
        name: "Neha Verma",
        marks: 80,
        class: "9th",
        address: "222, DEF Avenue, Chennai"
    },
    {
        name: "Manoj Kumar",
        marks: 75,
        class: "10th",
        address: "Delhi"
    },
    {
        name: "Pooja Mishra",
        marks: 88,
        class: "12th",
        address: "Lucknow"
    },
    {
        name: "Rajesh Singhaniya",
        marks: 92,
        class: "9th",
        address: "Jaipur"
    },
    {
        name: "Aman Gupta",
        marks: 68,
        class: "11th",
        address: "Noida"
    }
];

const cards = document.getElementById("studentCards");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function displayStudents(data) {
    cards.innerHTML = data.map(student => `
        <div class="card">
            <p><strong>Student Name:</strong> ${student.name}</p>
            <p><strong>Marks:</strong> ${student.marks}%</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <p><strong>Address:</strong> ${student.address}</p>
        </div>
    `).join("");
}

function searchStudents() {
    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText)
    );

    displayStudents(filteredStudents);
}

searchInput.addEventListener("input", searchStudents);
searchBtn.addEventListener("click", searchStudents);

displayStudents(students);
