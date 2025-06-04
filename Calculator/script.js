// Function to solve the math problem step by step
async function solveProblem() {
    const problem = document.getElementById('problemInput').value;
    const solutionDiv = document.getElementById('solution');

    if (!problem) {
        solutionDiv.innerHTML = "<p>Моля, въведете задача.</p>";
        return;
    }

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
            solutionDiv.innerHTML = `
                <h3>Решение стъпка по стъпка:</h3>
                <div class="solution-steps">${data.solution}</div>
            `;
        } else {
            solutionDiv.innerHTML = "<p>Грешка при решаването на задачата.</p>";
        }
    } catch (error) {
        console.error(error);
        solutionDiv.innerHTML = "<p>Възникна грешка при обработката на задачата.</p>";
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
async function askChatGPT(question) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  const data = await response.json();
  return data.response || data.error;
}
