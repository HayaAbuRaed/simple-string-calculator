const calc = (...args) => {
  if (args.length === 0) throw new Error("Invalid input");

  const operators = args.filter((arg, index) => index % 2 !== 0);
  const numbers = args.filter((arg, index) => index % 2 === 0);

  if (numbers.length - operators.length !== 1) throw new Error("Invalid input");

  if (
    numbers.some((num) => typeof num !== "number") ||
    operators.some((op) => typeof op !== "string")
  )
    throw new Error("Invalid input type");

  while (operators.includes("*") || operators.includes("/")) {
    let operatorIndex =
      operators.indexOf("*") > -1 ? operators.indexOf("*") : numbers.length;
    let operator = "";

    if (operators.indexOf("/") + 1 && operators.indexOf("/") < operatorIndex)
      operatorIndex = operators.indexOf("/");

    operator = operators[operatorIndex];

    if (operatorIndex === -1) break;

    if (operator === "*") {
      numbers[operatorIndex] *= numbers[operatorIndex + 1];
    } else {
      if (numbers[operatorIndex + 1] === 0) {
        throw new Error("Division by zero");
      }

      numbers[operatorIndex] /= numbers[operatorIndex + 1];
    }

    numbers.splice(operatorIndex + 1, 1);
    operators.splice(operatorIndex, 1);
  }

  while (operators.length) {
    const operator = operators.shift();

    if (operator === "+") numbers[0] += numbers[1];
    else if (operator === "-") numbers[0] -= numbers[1];
    else throw new Error("Invalid operator");

    numbers.splice(1, 1);
  }

  console.log(numbers[0]);
  return numbers[0];
};

module.exports = calc;
