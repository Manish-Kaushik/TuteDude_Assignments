let number1 = 153;
let number2 = 17;
let number3 = 10;
let number4 = 25;
let number5 = 7;

let n = number5;
let sum = 0;

for (let i = 1; i <= n; i++) {
    sum += i;
}

console.log("Sum of first " + n + " numbers: " + sum);

console.log("Table of " + number3 + ":");
for (let i = 1; i <= 10; i++) {
    console.log(number3 + " x " + i + " = " + (number3 * i));
}

let prime = true;

if (number2 < 2) {
    prime = false;
} else {
    for (let i = 2; i < number2; i++) {
        if (number2 % i === 0) {
            prime = false;
            break;
        }
    }
}

console.log("Is " + number2 + " a prime number? " + (prime ? "Yes" : "No"));

let factors = [];

for (let i = 1; i <= number4; i++) {
    if (number4 % i === 0) {
        factors.push(i);
    }
}

console.log("Factors of " + number4 + ": " + factors.join(", "));

let digitSum = 0;
let temp = number1;

while (temp > 0) {
    digitSum += temp % 10;
    temp = Math.floor(temp / 10);
}

console.log("Sum of digits of " + number1 + ": " + digitSum);

let digits = String(number1).length;
let armstrongSum = 0;
temp = number1;

while (temp > 0) {
    let digit = temp % 10;
    armstrongSum += digit ** digits;
    temp = Math.floor(temp / 10);
}

console.log("Is " + number1 + " an Armstrong number? " + (armstrongSum === number1 ? "Yes" : "No"));

console.log("Number of variables checked: 5");
