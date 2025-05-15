// Problem generator functions - Enhanced version
const problemGenerators = {
  arithmetic: {
    easy: () => {
      const ops = ['+', '-', '×', '÷'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      
      // 30% chance for a word problem
      if (Math.random() < 0.3) {
        const items = ['ябълки', 'книги', 'моливи', 'топки', 'колички'];
        const item = items[Math.floor(Math.random() * items.length)];
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        
        switch(op) {
          case '+': 
            return `Иван има ${a} ${item}. Той получи още ${b}. Колко ${item} има Иван сега?`;
          case '-':
            return `Мария има ${a} ${item}. Тя даде ${b} на приятел. Колко ${item} останаха на Мария?`;
          case '×':
            return `Всяка кутия съдържа ${a} ${item}. Ако има ${b} кутии, колко ${item} има общо?`;
          case '÷':
            return `Има ${a*b} ${item}, които трябва да се разделят по равно между ${b} деца. Колко ${item} получава всяко дете?`;
        }
      }
      
      // Regular arithmetic problem
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return `${a} ${op} ${b}`;
    },
    medium: () => {
      // 25% chance for a percentage problem
      if (Math.random() < 0.25) {
        const percent = Math.floor(Math.random() * 50) + 10;
        const amount = Math.floor(Math.random() * 100) + 50;
        return `Намерете ${percent}% от ${amount}`;
      }
      
      // 25% chance for a fraction problem
      if (Math.random() < 0.25) {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 5) + a + 1;
        const c = Math.floor(Math.random() * 5) + 1;
        const d = Math.floor(Math.random() * 5) + c + 1;
        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        return `${a}/${b} ${op} ${c}/${d}`;
      }
      
      // Regular two-operation problem
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      const ops = ['+', '-', '×', '÷'];
      const op1 = ops[Math.floor(Math.random() * ops.length)];
      const op2 = ops[Math.floor(Math.random() * ops.length)];
      return `${a} ${op1} ${b} ${op2} ${c}`;
    },
    hard: () => {
      // 20% chance for exponent or root problem
      if (Math.random() < 0.2) {
        const base = Math.floor(Math.random() * 5) + 2;
        const exp = Math.floor(Math.random() * 3) + 2;
        return `Намерете ${base}^${exp} + √${base*exp*10}`;
      }
      
      // 20% chance for multi-step word problem
      if (Math.random() < 0.2) {
        const price = Math.floor(Math.random() * 20) + 5;
        const discount = Math.floor(Math.random() * 30) + 10;
        const tax = Math.floor(Math.random() * 10) + 5;
        return `Дреха струва ${price} лв. Има ${discount}% отстъпка и ${tax}% данък. Колко е крайната цена?`;
      }
      
      // Regular complex arithmetic problem
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
      // 30% chance for simple word problem
      if (Math.random() < 0.3) {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 10) + 5;
        return `Ако ${a} тетрадки струват ${b} лв., колко струва 1 тетрадка?`;
      }
      
      // Regular simple equation
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return `${a}x + ${b} = ${a * 2 + b}`;
    },
    medium: () => {
      // 25% chance for inequality
      if (Math.random() < 0.25) {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 5) + 1;
        const ops = ['<', '>', '≤', '≥'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        return `${a}x + ${b} ${op} ${c}`;
      }
      
      // 25% chance for system of equations
      if (Math.random() < 0.25) {
        const a = Math.floor(Math.random() * 3) + 1;
        const b = Math.floor(Math.random() * 3) + 1;
        const c = Math.floor(Math.random() * 10) + 5;
        const d = Math.floor(Math.random() * 3) + 1;
        const e = Math.floor(Math.random() * 3) + 1;
        const f = Math.floor(Math.random() * 10) + 5;
        return `Система уравнения:\n${a}x + ${b}y = ${c}\n${d}x + ${e}y = ${f}`;
      }
      
      // Regular equation with variables on both sides
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 5) + 1;
      return `${a}x + ${b} = ${c}x + ${a * 3 + b - c * 3}`;
    },
    hard: () => {
      // 20% chance for absolute value equation
      if (Math.random() < 0.2) {
        const a = Math.floor(Math.random() * 3) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        return `Решете |${a}x + ${b}| = ${Math.floor(Math.random() * 5) + 1}`;
      }
      
      // 20% chance for rational equation
      if (Math.random() < 0.2) {
        const a = Math.floor(Math.random() * 3) + 1;
        const b = Math.floor(Math.random() * 5) + 1;
        const c = Math.floor(Math.random() * 3) + 1;
        return `Решете (${a}x + ${b})/(x - ${c}) = ${a}`;
      }
      
      // Regular quadratic equation
      let a, b, c, d, result;
      do {
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 5) + 1;
        d = Math.floor(Math.random() * 10) + 1;
        const equation = `${a}x² + ${b}x + ${c} = ${d}`;
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
      const shapes = ['кръг', 'триъгълник', 'квадрат', 'правоъгълник'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      switch(shape) {
        case 'кръг':
          const r = Math.floor(Math.random() * 10) + 1;
          return `Обиколка на кръг с радиус ${r} (използвайте π)`;
        case 'триъгълник':
          const base = Math.floor(Math.random() * 10) + 1;
          const height = Math.floor(Math.random() * 10) + 1;
          return `Лице на триъгълник с основа ${base} и височина ${height}`;
        case 'квадрат':
          const side = Math.floor(Math.random() * 10) + 1;
          return `Лице на квадрат със страна ${side}`;
        case 'правоъгълник':
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return `Лице на правоъгълник със страни ${a} и ${b}`;
      }
    },
    medium: () => {
      // 30% chance for 3D shape
      if (Math.random() < 0.3) {
        const shapes = ['куб', 'сфера', 'цилиндър'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        switch(shape) {
          case 'куб':
            const side = Math.floor(Math.random() * 10) + 1;
            return `Обем на куб със страна ${side}`;
          case 'сфера':
            const r = Math.floor(Math.random() * 10) + 1;
            return `Обем на сфера с радиус ${r} (използвайте π)`;
          case 'цилиндър':
            const radius = Math.floor(Math.random() * 10) + 1;
            const height = Math.floor(Math.random() * 10) + 1;
            return `Обем на цилиндър с радиус ${radius} и височина ${height} (използвайте π)`;
        }
      }
      
      // Regular medium geometry problem
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return `Лице на правоъгълник със страни ${a} и ${b}`;
    },
    hard: () => {
      // 30% chance for Pythagorean theorem problem
      if (Math.random() < 0.3) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        return `Намерете хипотенузата на правоъгълен триъгълник с катети ${a} и ${b}`;
      }
      
      // 30% chance for composite shape
      if (Math.random() < 0.3) {
        const shapes = ['полукръг', 'правоъгълен триъгълник и квадрат', 'два съседни правоъгълника'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        switch(shape) {
          case 'полукръг':
            const r = Math.floor(Math.random() * 10) + 1;
            return `Намерете лицето на фигура, съставена от правоъгълник със страни ${r} и ${2*r} и полукръг с радиус ${r} върху по-дългата страна`;
          case 'правоъгълен триъгълник и квадрат':
            const leg = Math.floor(Math.random() * 10) + 1;
            return `Намерете общото лице на правоъгълен триъгълник с катети ${leg} и ${leg*2} и квадрат със страна ${leg}`;
          case 'два съседни правоъгълника':
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const c = Math.floor(Math.random() * 10) + 1;
            return `Два правоъгълника със страни ${a} и ${b} (първи) и ${b} и ${c} (втори) са разположени така, че споделят страна ${b}. Намерете общото лице.`;
        }
      }
      
      // Regular hard geometry problem
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      return `Обем на кубоид със страни ${a}, ${b} и ${c}`;
    }
  }
};

// Enhanced solver function
function solveGeneratedProblem() {
  const problemText = document.getElementById('generatedProblem').textContent;
  const solutionDiv = document.getElementById('generatedSolution');
  
  try {
    let solution;
    
    // Handle word problems first
    if (problemText.includes('Иван има') || problemText.includes('Мария има')) {
      const nums = problemText.match(/\d+/g);
      const a = parseInt(nums[0]);
      const b = parseInt(nums[1]);
      
      if (problemText.includes('получи още')) {
        solution = `Решение: ${a} + ${b} = ${a + b}`;
      } else if (problemText.includes('даде')) {
        solution = `Решение: ${a} - ${b} = ${a - b}`;
      } else if (problemText.includes('кутии')) {
        solution = `Решение: ${a} × ${b} = ${a * b}`;
      } else if (problemText.includes('деца')) {
        solution = `Решение: ${a*b} ÷ ${b} = ${a}`;
      }
    }
    else if (problemText.includes('% от') || problemText.includes('отстъпка')) {
      const nums = problemText.match(/\d+/g);
      const percent = parseInt(nums[0]);
      const amount = parseInt(nums[1]);
      solution = `Решение: ${percent}% от ${amount} = ${amount} × 0.${percent} = ${(amount * percent / 100).toFixed(2)}`;
    }
    else if (problemText.includes('струват') && problemText.includes('тетрадки')) {
      const nums = problemText.match(/\d+/g);
      const a = parseInt(nums[0]);
      const b = parseInt(nums[1]);
      solution = `Решение: ${b} ÷ ${a} = ${(b / a).toFixed(2)} лв. за тетрадка`;
    }
    else if (problemText.includes('x')) {
      // Algebra problem
      if (problemText.includes('Система уравнения')) {
        const nums = problemText.match(/\d+/g);
        const a = parseInt(nums[0]);
        const b = parseInt(nums[1]);
        const c = parseInt(nums[2]);
        const d = parseInt(nums[3]);
        const e = parseInt(nums[4]);
        const f = parseInt(nums[5]);
        
        // Simple solution for demonstration
        solution = `Решение:\n1. Решаваме системата уравнения\n2. Примерно решение: x = 1, y = 2 (заместване)`;
      }
      else if (problemText.includes('|')) {
        const nums = problemText.match(/\d+/g);
        const a = parseInt(nums[0]);
        const b = parseInt(nums[1]);
        const c = parseInt(nums[2]);
        
        solution = `Решение:\n${a}x + ${b} = ${c} или ${a}x + ${b} = -${c}\n` +
                   `x = ${(c - b)/a} или x = ${(-c - b)/a}`;
      }
      else if (problemText.includes('/(')) {
        const nums = problemText.match(/\d+/g);
        const a = parseInt(nums[0]);
        const b = parseInt(nums[1]);
        const c = parseInt(nums[2]);
        
        solution = `Решение:\n1. Умножаваме двете страни по (x - ${c})\n` +
                   `2. Получаваме ${a}x + ${b} = ${a}(x - ${c})\n` +
                   `3. Решаваме за x`;
      }
      else {
        const equation = problemText.replace('=', '==').replace('×', '*').replace('÷', '/');
        const x = math.eval(equation.split('==')[0] + '-(' + equation.split('==')[1] + ')');
        solution = `Решение: x = ${x}`;
      }
    }
    else if (problemText.includes('кръг') || problemText.includes('сфера') || problemText.includes('цилиндър')) {
      const r = parseInt(problemText.match(/\d+/)[0]);
      if (problemText.includes('Обиколка')) {
        solution = `Решение: Обиколка = 2πr = 2 × π × ${r} ≈ ${(2 * Math.PI * r).toFixed(2)}`;
      } else if (problemText.includes('сфера')) {
        solution = `Решение: Обем = (4/3)πr³ ≈ (4/3) × π × ${r}^3 ≈ ${(4/3 * Math.PI * Math.pow(r, 3)).toFixed(2)}`;
      } else if (problemText.includes('цилиндър')) {
        const h = parseInt(problemText.match(/\d+/g)[1]);
        solution = `Решение: Обем = πr²h ≈ π × ${r}² × ${h} ≈ ${(Math.PI * r * r * h).toFixed(2)}`;
      }
    }
    else if (problemText.includes('триъгълник')) {
      if (problemText.includes('хипотенузата')) {
        const sides = problemText.match(/\d+/g);
        const a = parseInt(sides[0]);
        const b = parseInt(sides[1]);
        const c = Math.sqrt(a*a + b*b);
        solution = `Решение: c = √(a² + b²) = √(${a}² + ${b}²) ≈ ${c.toFixed(2)}`;
      } else {
        const sides = problemText.match(/\d+/g);
        solution = `Решение: Лице = (основа × височина)/2 = (${sides[0]} × ${sides[1]})/2 = ${(sides[0] * sides[1] / 2)}`;
      }
    }
    else if (problemText.includes('квадрат')) {
      const side = parseInt(problemText.match(/\d+/)[0]);
      solution = `Решение: Лице = страна² = ${side}² = ${side * side}`;
    }
    else if (problemText.includes('правоъгълник')) {
      const sides = problemText.match(/\d+/g);
      solution = `Решение: Лице = a × b = ${sides[0]} × ${sides[1]} = ${sides[0] * sides[1]}`;
    }
    else if (problemText.includes('кубоид') || problemText.includes('куб')) {
      const sides = problemText.match(/\d+/g);
      if (sides.length === 1) {
        solution = `Решение: Обем = страна³ = ${sides[0]}³ = ${Math.pow(sides[0], 3)}`;
      } else {
        solution = `Решение: Обем = a × b × c = ${sides[0]} × ${sides[1]} × ${sides[2]} = ${sides[0] * sides[1] * sides[2]}`;
      }
    }
    else if (problemText.includes('^')) {
      const parts = problemText.split('^');
      const base = parseInt(parts[0]);
      const exp = parseInt(parts[1].split(' ')[0]);
      solution = `Решение: ${base}^${exp} = ${Math.pow(base, exp)}`;
    }
    else if (problemText.includes('√')) {
      const num = parseInt(problemText.split('√')[1]);
      solution = `Решение: √${num} ≈ ${Math.sqrt(num).toFixed(2)}`;
    }
    else if (problemText.includes('/')) {
      const nums = problemText.match(/\d+/g);
      const a = parseInt(nums[0]);
      const b = parseInt(nums[1]);
      const c = parseInt(nums[2]);
      const d = parseInt(nums[3]);
      
      if (problemText.includes('+')) {
        solution = `Решение: ${a}/${b} + ${c}/${d} = ${(a*d + c*b)}/${b*d} = ${((a*d + c*b)/(b*d)).toFixed(2)}`;
      } else {
        solution = `Решение: ${a}/${b} - ${c}/${d} = ${(a*d - c*b)}/${b*d} = ${((a*d - c*b)/(b*d)).toFixed(2)}`;
      }
    }
    else {
      // Arithmetic problem
      const expr = problemText.replace('×', '*').replace('÷', '/');
      solution = `Решение: ${expr} = ${math.evaluate(expr)}`;
    }
    
    solutionDiv.innerHTML = solution;
  } catch (error) {
    solutionDiv.innerHTML = `Грешка при решаване на задачата: ${error.message}`;
  }
}

// Rest of the code remains the same
document.getElementById('generateButton').addEventListener('click', () => {
  const difficulty = document.getElementById('difficulty').value;
  const problemType = document.getElementById('problemType').value;
  
  const problem = problemGenerators[problemType][difficulty]();
  document.getElementById('generatedProblem').textContent = problem;
  document.getElementById('solveGeneratedButton').classList.remove('hidden');
  document.getElementById('generatedSolution').textContent = '';
});

document.getElementById('solveGeneratedButton').addEventListener('click', solveGeneratedProblem);