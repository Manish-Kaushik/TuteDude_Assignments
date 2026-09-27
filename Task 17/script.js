// Promise-based divide function using an arrow function
const divide = (firstNumber, secondNumber) => {
    return new Promise((resolve, reject) => {
        if (secondNumber === 0) {
            reject("Error: Division by zero is not allowed.");
        } else {
            const result = firstNumber / secondNumber;
            resolve(result);
        }
    });
};

// Function to test different cases
const runTest = (firstNumber, secondNumber) => {
    console.log(`Dividing ${firstNumber} by ${secondNumber}...`);

    divide(firstNumber, secondNumber)
        .then(result => {
            console.log(`Result: ${result}`);
        })
        .catch(error => {
            console.log(error);
        });
};

// At least 5 test cases
runTest(10, 2);
runTest(20, 5);
runTest(15, 3);
runTest(100, 4);
runTest(10, 0);

// Browser interaction
const divideBtn = document.getElementById("divideBtn");
const firstInput = document.getElementById("firstNumber");
const secondInput = document.getElementById("secondNumber");
const resultBox = document.getElementById("result");

divideBtn.addEventListener("click", () => {
    const firstNumber = Number(firstInput.value);
    const secondNumber = Number(secondInput.value);

    if (firstInput.value === "" || secondInput.value === "") {
        resultBox.textContent = "Please enter both numbers.";
        return;
    }

    console.log(`Dividing ${firstNumber} by ${secondNumber}...`);

    divide(firstNumber, secondNumber)
        .then(result => {
            resultBox.textContent = `Result: ${result}`;
            console.log(`Result: ${result}`);
        })
        .catch(error => {
            resultBox.textContent = error;
            console.log(error);
        });
});
