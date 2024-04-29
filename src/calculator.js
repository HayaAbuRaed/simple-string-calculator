const calc = (a, operator, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Invalid input type");
  }

  switch (operator) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      if (b === 0) throw new Error("Division by zero");
      return a / b;

    default:
      throw new Error("Invalid operator");
  }
};

module.exports = calc;