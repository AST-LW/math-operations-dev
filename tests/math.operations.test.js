const mathOps = require("../src/math.operations");

describe("Math Operations", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(mathOps.add(1, 2)).toBe(3);
    });

    test("subtracts 5 - 2 to equal 3", () => {
        expect(mathOps.subtract(5, 2)).toBe(3);
    });

    test("multiplies 2 * 3 to equal 6", () => {
        expect(mathOps.multiply(2, 3)).toBe(6);
    });

    test("divides 6 / 2 to equal 3", () => {
        expect(mathOps.divide(6, 2)).toBe(3);
    });

    test("divides 6 / 0 to handle division by zero", () => {
        expect(mathOps.divide(6, 0)).toBeNull();
    });

    test("raises 2 to the power of 3 to equal 8", () => {
        expect(mathOps.power(2, 3)).toBe(8);
    });

    test("computes the square root of 9 to equal 3", () => {
        expect(mathOps.sqrt(9)).toBe(3);
    });

    test("handles square root of a negative number", () => {
        expect(mathOps.sqrt(-1)).toBeNull();
    });
});
