// Function to solve the math problem step by step
function solveProblem() {
    // Get the input value
    const problem = document.getElementById('problemInput').value;
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
      let modifiedProblem = replaceSymbols(problem);
  
      // Step 3: Display the problem with spelled-out symbols
      steps.push(`<strong>Стъпка:</strong> ${modifiedProblem}`);
  
      // Step 4: Evaluate the expression step by step
      let currentExpression = modifiedProblem;
  
      // Solve parentheses first (including sqrt, etc.)
      while (currentExpression.includes('(')) {
        const start = currentExpression.lastIndexOf('(');
        const end = currentExpression.indexOf(')', start);
  
        // Check if there is a closing parenthesis
        if (end === -1) {
          throw new Error("Липсва затваряща скоба.");
        }
  
        // Extract the sub-expression inside the parentheses
        const subExpression = currentExpression.substring(start + 1, end);
  
        // Evaluate the sub-expression
        const subResult = math.evaluate(subExpression);
  
        // Replace the sub-expression with its result
        currentExpression =
          currentExpression.substring(0, start) + subResult + currentExpression.substring(end + 1);
  
        // Add the step to the steps array
        steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }
  
      // Solve exponents
      while (currentExpression.includes('^')) {
        const index = currentExpression.indexOf('^');
        const base = parseFloat(currentExpression.substring(0, index).trim());
        const exponent = parseFloat(currentExpression.substring(index + 1).trim());
        const result = Math.pow(base, exponent);
        currentExpression =
          currentExpression.substring(0, index) + result + currentExpression.substring(index + 2);
        steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }
  
      // Solve multiplication and division
      while (currentExpression.includes('*') || currentExpression.includes('/')) {
        const mulIndex = currentExpression.indexOf('*');
        const divIndex = currentExpression.indexOf('/');
        const opIndex = mulIndex !== -1 && (divIndex === -1 || mulIndex < divIndex) ? mulIndex : divIndex;
        const operator = currentExpression[opIndex];
  
        const left = parseFloat(currentExpression.substring(0, opIndex).trim());
        const right = parseFloat(currentExpression.substring(opIndex + 1).trim());
        const result = operator === '*' ? left * right : left / right;
  
        currentExpression =
          currentExpression.substring(0, opIndex - 1) + result + currentExpression.substring(opIndex + 2);
        steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }
  
      // Solve addition and subtraction
      while (currentExpression.includes('+') || currentExpression.includes('-')) {
        const addIndex = currentExpression.indexOf('+');
        const subIndex = currentExpression.indexOf('-');
        const opIndex = addIndex !== -1 && (subIndex === -1 || addIndex < subIndex) ? addIndex : subIndex;
        const operator = currentExpression[opIndex];
  
        const left = parseFloat(currentExpression.substring(0, opIndex).trim());
        const right = parseFloat(currentExpression.substring(opIndex + 1).trim());
        const result = operator === '+' ? left + right : left - right;
  
        currentExpression =
          currentExpression.substring(0, opIndex) + result + currentExpression.substring(opIndex + 1);
        steps.push(`<strong>Стъпка:</strong> ${currentExpression}`);
      }
  
      // Rename the last step to "Резултат"
      if (steps.length > 1) {
        steps[steps.length - 1] = steps[steps.length - 1].replace('Стъпка:', 'Резултат:');
      }
  
      // Display all steps
      solutionDiv.innerHTML = `<h3>Решение стъпка по стъпка:</h3>${steps.map((step) => `<p>${step}</p>`).join('')}`;
    } catch (error) {
      // Handle errors (e.g., invalid input)
      console.error(error); // Log the error for debugging
      solutionDiv.innerHTML = `<p>Грешка: Невалидна математическа задача. (${error.message})</p>`;
    }
  }
  
  // Function to replace symbols with their Math.js counterparts
  function replaceSymbols(problem) {
    let result = problem;
  
    // Replace √ with sqrt(
    while (result.includes('√')) {
      const index = result.indexOf('√');
      result = result.substring(0, index) + 'sqrt' + result.substring(index + 1);
    }
  
    // Replace ² with ^2
    while (result.includes('²')) {
      const index = result.indexOf('²');
      result = result.substring(0, index) + '^2' + result.substring(index + 1);
    }
  
    // Replace ⁻¹ with ^(-1)
    while (result.includes('⁻¹')) {
      const index = result.indexOf('⁻¹');
      result = result.substring(0, index) + '^(-1)' + result.substring(index + 2);
    }
  
    // Replace ÷ with /
    while (result.includes('÷')) {
      const index = result.indexOf('÷');
      result = result.substring(0, index) + '/' + result.substring(index + 1);
    }
  
    // Replace × with *
    while (result.includes('×')) {
      const index = result.indexOf('×');
      result = result.substring(0, index) + '*' + result.substring(index + 1);
    }
  
    // Replace π with pi
    while (result.includes('π')) {
      const index = result.indexOf('π');
      result = result.substring(0, index) + 'pi' + result.substring(index + 1);
    }
  
    return result;
  }
  
  // Function to insert symbols into the input field
  function insertSymbol(symbol) {
    const input = document.getElementById('problemInput');
  
    // Handle special symbols
    switch (symbol) {
      case '√':
        input.value += '√('; // Insert √(
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
  mathButtons.forEach((button) => {
    button.addEventListener('click', () => {
      insertSymbol(button.textContent);
    });
  });