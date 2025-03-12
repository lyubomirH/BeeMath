// Function to solve the math problem step by step
function solveProblem() {
  // Get the input value
  let problem = document.getElementById('problemInput').value;
  const solutionDiv = document.getElementById('solution');

  // Check if the input is empty
  if (!problem) {
      solutionDiv.innerHTML = "<p>Моля, въведете задача.</p>";
      return;
  }

  try {
      // Initialize steps array to store each step
      const steps = [];

      // Step 1: Display the original problem
      steps.push(`<strong>Задача:</strong> ${problem}`);

      // Step 2: Replace symbols with Math.js compatible syntax
      problem = problem.replace(/√/g, 'sqrt('); // Replace √ with sqrt(
      problem = problem.replace(/²/g, '^2');    // Replace ² with ^2
      problem = problem.replace(/⁻¹/g, '^(-1)'); // Replace ⁻¹ with ^(-1)
      problem = problem.replace(/÷/g, '/');     // Replace ÷ with /
      problem = problem.replace(/×/g, '*');      // Replace × with *
      problem = problem.replace(/π/g, 'pi');     // Replace π with pi

      // Step 3: Evaluate the expression step by step
      let currentExpression = problem;

      // Solve parentheses first
      while (currentExpression.includes('(')) {
          const start = currentExpression.lastIndexOf('(');
          const end = currentExpression.indexOf(')', start);
          const subExpression = currentExpression.slice(start + 1, end);
          const subResult = math.evaluate(subExpression);
          currentExpression = currentExpression.slice(0, start) + subResult + currentExpression.slice(end + 1);
          steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }

      // Solve exponents
      while (currentExpression.match(/\^/)) {
          const match = currentExpression.match(/(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/);
          if (!match) break;
          const [fullMatch, base, , exponent] = match;
          const result = Math.pow(parseFloat(base), parseFloat(exponent));
          currentExpression = currentExpression.replace(fullMatch, result);
          steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }

      // Solve multiplication and division
      while (currentExpression.match(/[\*\/]/)) {
          const match = currentExpression.match(/(\d+(\.\d+)?)\s*([\*\/])\s*(\d+(\.\d+)?)/);
          if (!match) break;
          const [fullMatch, num1, , operator, num2] = match;
          const result = operator === '*' ? parseFloat(num1) * parseFloat(num2) : parseFloat(num1) / parseFloat(num2);
          currentExpression = currentExpression.replace(fullMatch, result);
          steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }

      // Solve addition and subtraction
      while (currentExpression.match(/[\+\-]/)) {
          const match = currentExpression.match(/(\d+(\.\d+)?)\s*([\+\-])\s*(\d+(\.\d+)?)/);
          if (!match) break;
          const [fullMatch, num1, , operator, num2] = match;
          const result = operator === '+' ? parseFloat(num1) + parseFloat(num2) : parseFloat(num1) - parseFloat(num2);
          currentExpression = currentExpression.replace(fullMatch, result);
          steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }

      // Rename the last step to "Резултат"
      if (steps.length > 1) {
          steps[steps.length - 1] = steps[steps.length - 1].replace('Стъпка:', 'Резултат:');
      }

      // Display all steps
      solutionDiv.innerHTML = `<h3>Решение стъпка по стъпка:</h3>${steps.map(step => `<p>${step}</p>`).join('')}`;
  } catch (error) {
      // Handle errors (e.g., invalid input)
      solutionDiv.innerHTML = `<p>Грешка: Невалидна математическа задача.</p>`;
  }
}

// Function to insert symbols into the input field
function insertSymbol(symbol) {
  const input = document.getElementById('problemInput');

  // Handle special symbols
  switch (symbol) {
      case '√':
          input.value += '√'; // Insert √
          break;
      case '²':
          input.value += '²'; // Insert ²
          break;
      case '⁻¹':
          input.value += '⁻¹'; // Insert ⁻¹
          break;
      case '÷':
          input.value += '÷'; // Insert ÷
          break;
      case '×':
          input.value += '×'; // Insert ×
          break;
      case 'π':
          input.value += 'π'; // Insert π
          break;
      case '^':
          input.value += '^'; // Insert ^
          break;
      default:
          input.value += symbol; // Default case for other symbols
  }
}

// Add event listener to the solve button
document.getElementById('solveButton').addEventListener('click', solveProblem);

// Add event listeners to math keyboard buttons
const mathButtons = document.querySelectorAll('#math-keyboard button');
mathButtons.forEach(button => {
  button.addEventListener('click', () => {
      insertSymbol(button.textContent);
  });
});