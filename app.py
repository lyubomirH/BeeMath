from flask import Flask, request, jsonify
from sympy import symbols, Eq, solve, sqrt, simplify, sympify
from sympy.parsing.sympy_parser import parse_expr
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/solve', methods=['POST'])
def solve_math_problem():
    data = request.get_json()
    problem = data.get('problem')

    print(f"Получена задача: {problem}")

    if not problem:
        return jsonify({'error': 'Няма въведена задача'}), 400

    try:
        x = symbols('x')
        expr = parse_expr(problem, locals={'x': x})

        solution = solve(expr, x)
        simplified_solution = [simplify(sol) for sol in solution]

        explanation = f"Уравнението {expr} се решава чрез намиране на корените. Решенията са: {simplified_solution}."

        print(f"Решение: {simplified_solution}")

        return jsonify({
            'problem': problem,
            'solution': str(simplified_solution),
            'explanation': explanation
        })
    except Exception as e:
        print(f"Грешка: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)