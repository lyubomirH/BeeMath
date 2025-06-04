// Problem generator functions
const problemGenerators = {
  arithmetic: {
    easy: () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const ops = ['+', '-', '×', '÷'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      return `${a} ${op} ${b}`;
    },
    medium: () => {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      const ops = ['+', '-', '×', '÷'];
      const op1 = ops[Math.floor(Math.random() * ops.length)];
      const op2 = ops[Math.floor(Math.random() * ops.length)];
      return `${a} ${op1} ${b} ${op2} ${c}`;
    },
    hard: () => {
      let a, b, c, d, result, expression;
      do {
        a = Math.floor(Math.random() * 50) + 1;
        b = Math.floor(Math.random() * 50) + 1;
        c = Math.floor(Math.random() * 20) + 1;
        d = Math.floor(Math.random() * 10) + 1;
        expression = `(${a} + ${b} × ${c}) ÷ ${d}`;
        result = math.evaluate(expression.replace('×', '*').replace('÷', '/'));
      } while (!isAcceptableResult(result));
      
      return expression;
    }
  },
  algebra: {
    easy: () => {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return `${a}x + ${b} = ${a * 2 + b}`;
    },
    medium: () => {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 5) + 1;
      return `${a}x + ${b} = ${c}x + ${a * 3 + b - c * 3}`;
    },
    hard: () => {
      let a, b, c, d, result;
      do {
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 5) + 1;
        d = Math.floor(Math.random() * 10) + 1;
        const equation = `${a}x² + ${b}x + ${c} = ${d}`;
        // Проверка за реални корени
        const discriminant = b * b - 4 * a * (c - d);
        if (discriminant >= 0) {
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          result = [x1, x2];
        } else {
          result = null;
        }
      } while (!result || !result.every(isAcceptableResult));
      
      return `${a}x² + ${b}x + ${c} = ${d}`;
    }
  },
  geometry: {
    easy: () => {
      const r = Math.floor(Math.random() * 10) + 1;
      return `Обиколка на кръг с радиус ${r} (използвайте π)`;
    },
    medium: () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return `Лице на правоъгълник със страни ${a} и ${b}`;
    },
    hard: () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      return `Обем на кубоид със страни ${a}, ${b} и ${c}`;
    }
  }
};

// Проверка дали резултатът е приемлив (цяло число или с <= 2 цифри след десетичната запетая)
function isAcceptableResult(value) {
if (Array.isArray(value)) {
  return value.every(isAcceptableResult);
}
if (Number.isInteger(value)) {
  return true;
}
const decimalPart = String(value).split('.')[1];
return decimalPart && decimalPart.length <= 2;
}

// Останалите функции остават същите
async function solveGeneratedProblem() {
  const problemText = document.getElementById('generatedProblem').textContent;
  const solutionDiv = document.getElementById('generatedSolution');
  
  try {
    let solution;
    if (problemText.includes('x')) {
      // Algebra problem
      const equation = problemText.replace('=', '==').replace('×', '*').replace('÷', '/');
      const x = math.eval(equation.split('==')[0] + '-(' + equation.split('==')[1] + ')');
      solution = `Решение: x = ${x}`;
    } else if (problemText.includes('кръг')) {
      // Circle problem
      const r = parseInt(problemText.match(/\d+/)[0]);
      solution = `Решение: Обиколка = 2πr = 2 × π × ${r} ≈ ${(2 * Math.PI * r).toFixed(2)}`;
    } else if (problemText.includes('правоъгълник')) {
      // Rectangle problem
      const sides = problemText.match(/\d+/g);
      solution = `Решение: Лице = a × b = ${sides[0]} × ${sides[1]} = ${sides[0] * sides[1]}`;
    } else if (problemText.includes('кубоид')) {
      // Cuboid problem
      const sides = problemText.match(/\d+/g);
      solution = `Решение: Обем = a × b × c = ${sides[0]} × ${sides[1]} × ${sides[2]} = ${sides[0] * sides[1] * sides[2]}`;
    } else {
      // Arithmetic problem
      const expr = problemText.replace('×', '*').replace('÷', '/');
      solution = `Решение: ${expr} = ${math.evaluate(expr)}`;
    }
    
    solutionDiv.innerHTML = solution;
  } catch (error) {
    solutionDiv.innerHTML = `Грешка при решаване на задачата: ${error.message}`;
  }
}

// Event listeners
document.getElementById('generateButton').addEventListener('click', () => {
  const difficulty = document.getElementById('difficulty').value;
  const problemType = document.getElementById('problemType').value;
  
  const problem = problemGenerators[problemType][difficulty]();
  document.getElementById('generatedProblem').textContent = problem;
  document.getElementById('solveGeneratedButton').classList.remove('hidden');
  document.getElementById('generatedSolution').textContent = '';
});

document.getElementById('solveGeneratedButton').addEventListener('click', solveGeneratedProblem);

async function generateProblem() {
    const difficulty = document.getElementById('difficulty').value;
    const problemType = document.getElementById('problemType').value;
    
    try {
        const response = await fetch("/generate_problem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ difficulty, problemType })
        });

        const data = await response.json();
        if (data.problem) {
            document.getElementById('generatedProblem').textContent = data.problem;
            document.getElementById('solveGeneratedButton').classList.remove('hidden');
            document.getElementById('generatedSolution').textContent = '';
        }
    } catch (error) {
        console.error(error);
        alert('Грешка при генерирането на задача');
    }
}

async function solveProblem() {
    const problem = document.getElementById('generatedProblem').textContent;
    
    try {
        const response = await fetch("/solve_problem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ problem })
        });

        const data = await response.json();
        if (data.solution) {
            document.getElementById('generatedSolution').innerHTML = data.solution;
        }
    } catch (error) {
        console.error(error);
        alert('Грешка при решаването на задачата');
    }
}