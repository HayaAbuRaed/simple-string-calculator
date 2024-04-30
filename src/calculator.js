const separateOpsAndNums = (args) => {
  const operators = args.filter((arg, index) => index % 2 !== 0);
  const numbers = args.filter((arg, index) => index % 2 === 0);

  if (numbers.length - operators.length !== 1) throw new Error("Invalid input");

  if (
    numbers.some((num) => typeof num !== "number") ||
    operators.some((op) => typeof op !== "string")
  )
    throw new Error("Invalid input type");

  return { operators, numbers };
};

const calcStrongOps = (operators, numbers) => {
  while (operators.includes("*") || operators.includes("/")) {
    const productIndex = operators.indexOf("*");
    const divisionIndex = operators.indexOf("/");

    let operatorIndex = productIndex > -1 ? productIndex : operators.length;

    if (divisionIndex + 1 && divisionIndex < operatorIndex)
      operatorIndex = divisionIndex;

    const operator = operators[operatorIndex];

    const firstOperand = numbers[operatorIndex];
    const secondOperand = numbers[operatorIndex + 1];

    if (firstOperand > 1000 && secondOperand > 1000) {
      numbers.splice(operatorIndex, 2);
      operators.splice(operatorIndex, 1);
      continue;
    } else if (firstOperand > 1000) numbers[operatorIndex] = secondOperand;
    else if (secondOperand > 1000);
    else {
      if (operator === "*")
        numbers[operatorIndex] *= numbers[operatorIndex + 1];
      else {
        if (numbers[operatorIndex + 1] === 0)
          throw new Error("Division by zero");

        numbers[operatorIndex] /= numbers[operatorIndex + 1];
      }
    }

    numbers.splice(operatorIndex + 1, 1);
    operators.splice(operatorIndex, 1);
  }
};

const calcRestOps = (operators, numbers) => {
  while (operators.length) {
    const operator = operators.shift();

    if (!numbers[1]) numbers[1] = 0; // to handle the case when the first operations omit all other operands

    if (numbers[0] > 1000 && numbers[1] > 1000) {
      numbers.splice(0, 2);
      continue;
    } else if (numbers[0] > 1000) numbers[0] = numbers[1];
    else if (numbers[1] > 1000);
    else {
      if (operator === "+") numbers[0] += numbers[1];
      else if (operator === "-") numbers[0] -= numbers[1];
      else throw new Error("Invalid operator");
    }

    numbers.splice(1, 1);
  }
};

const calc = (...args) => {
  if (args.length === 0) throw new Error("Invalid input");

  const { operators, numbers } = separateOpsAndNums(args);

  calcStrongOps(operators, numbers);

  operators.length && calcRestOps(operators, numbers);

  return numbers[0] ? numbers[0] : 0;
};

module.exports = calc;
