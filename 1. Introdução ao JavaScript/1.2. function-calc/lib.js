export function sum(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export function mult(a, b) {
  return a * b;
}

export function div(a, b) {
  if (b === 0) {
    return 'Não é permitido dividir por zero!';
  }
  return a / b;
}

export function calc(a, b, operator) {
  switch (operator) {
    case '+':
      return sum(a, b);
    case '-':
      return sub(a, b);
    case '*':
      return mult(a, b);
    case '/':
      return div(a, b);
  }
}