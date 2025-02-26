function insertSymbol(symbol) {
    const input = document.getElementById('math-input');
    input.value += symbol;
  }
  
  async function solveProblem() {
    const problem = document.getElementById('math-input').value;
    if (!problem) {
      alert("Моля, въведете задача!");
      return;
    }
  
    try {
      const response = await fetch('/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem: problem }),
      });
  
      const data = await response.json();
      const resultDiv = document.getElementById('result');
      if (data.error) {
        resultDiv.innerHTML = `<p style="color: red;">Грешка: ${data.error}</p>`;
      } else {
        resultDiv.innerHTML = `
          <p><strong>Задача:</strong> ${data.problem}</p>
          <p><strong>Решение:</strong> ${data.solution}</p>
          <p><strong>Обяснение:</strong> ${data.explanation}</p>
        `;
      }
    } catch (error) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `<p style="color: red;">Грешка при изпращане на задачата: ${error.message}</p>`;
    }
  }