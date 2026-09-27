let P = 100000;
let r = 0.10;
let n = 1;
let t = 3;

let A = P * Math.pow(1 + r / n, n * t);
let compoundInterest = A - P;

console.log("The compound interest after " + t + " years is: " + compoundInterest);
