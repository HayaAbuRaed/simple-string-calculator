const calc = require("../calculator");

describe("Calculator", () => {
  // Test case: Addition
  it("should return the correct sum of two numbers", () => {
    expect(calc(2, "+", 3)).toBe(5);
  });

  // Test case: Subtraction
  it("should return the correct difference of two numbers", () => {
    expect(calc(5, "-", 2)).toBe(3);
  });

  // Test case: Multiplication
  it("should return the correct product of two numbers", () => {
    expect(calc(4, "*", 6)).toBe(24);
  });

  // Test case: Division
  it("should return the correct quotient of two numbers", () => {
    expect(calc(10, "/", 2)).toBe(5);
  });

  // Test case: Division by zero
  it("should throw an error when dividing by zero", () => {
    expect(() => calc(6, "/", 0)).toThrow("Division by zero");
  });

  // Test case: Negative numbers
  it("should handle negative numbers correctly", () => {
    expect(calc(-8, "+", 5)).toBe(-3);
  });

  // Test case: Decimal numbers
  it("should handle decimal numbers correctly", () => {
    expect(calc(3.5, "*", 2)).toBe(7);
  });

  // Test case: Order of operations
  it("should follow the correct order of operations", () => {
    expect(calc(2, "+", 3, "*", 4)).toBe(14);
  });

  // Test case: Invalid operator
  it("should throw an error for an invalid operator", () => {
    expect(() => calc(5, "$", 3)).toThrow("Invalid operator");
  });

  // Test case: Invalid input type
  it("should throw an error for invalid input types", () => {
    expect(() => calc("2", "+", 3)).toThrow("Invalid input type");
  });

  // Test case: No arguments
  it("should throw an error for no arguments", () => {
    expect(() => calc()).toThrow("Invalid input");
  });

  // Test case: One argument
  it("should return the number if there is only one number argument", () => {
    expect(calc(5)).toBe(5);
  });

  // Test case: Missing arguments
  it("should throw an error for missing arguments", () => {
    expect(() => calc(2, "+")).toThrow("Invalid input");
  });

  // Test case: Ignore numbers greater than 1000
  it("should ignore numbers greater than 1000", () => {
    expect(calc(1001, "/", 100, "*", 1002, "+", 1003)).toBe(100);
  });

  // Test case: No numbers less than 1000
  it("should ignore numbers greater than 1000", () => {
    expect(calc(1001, "+", 1002, "+", 1003, "*", 1004, "+", 1005)).toBe(0);
  });

  // Test case: Maintain the original sign when ignoring numbers greater than 1000
  it("should maintain the original sign when ignoring numbers greater than 1000", () => {
    expect(calc(1001, "-", 5)).toBe(5);
  });
});
