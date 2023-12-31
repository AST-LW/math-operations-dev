const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? null : a / b);
const power = (base, exponent) => Math.pow(base, exponent);
const sqrt = (number) => (number < 0 ? null : Math.sqrt(number));

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
};
