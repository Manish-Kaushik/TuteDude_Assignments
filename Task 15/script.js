const numbers = [4, 8, 2, 11, 6, 7, 10];

function findMaximum(arr) {
    let maximum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }

    return maximum;
}

const calculateSum = function(arr) {
    let sum = 0;

    for (let number of arr) {
        sum += number;
    }

    return sum;
};

const countOddNumbers = (arr) => {
    let count = 0;

    for (let number of arr) {
        if (number % 2 !== 0) {
            count++;
        }
    }

    return count;
};

console.log("Array:", numbers);
console.log("Maximum number:", findMaximum(numbers));
console.log("Sum of all elements:", calculateSum(numbers));
console.log("Count of odd numbers:", countOddNumbers(numbers));
