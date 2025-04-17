from sympy import symbols, sqrt, sympify, Eq, solve

# Function to solve the math problem step by step
def solve_problem(problem):
    try:
        # Step 1: Display the original problem
        print(f"Задача: {problem}")

        # Step 2: Replace symbols with sympy-compatible syntax
        problem = problem.replace('√', 'sqrt(')  # Replace √ with sqrt(
        problem = problem.replace('²', '**2')    # Replace ² with **2
        problem = problem.replace('⁻¹', '**(-1)')  # Replace ⁻¹ with **(-1)
        problem = problem.replace('÷', '/')      # Replace ÷ with /
        problem = problem.replace('×', '*')      # Replace × with *
        problem = problem.replace('π', 'pi')     # Replace π with pi

        # Step 3: Parse the expression
        x = symbols('x')
        expr = sympify(problem)

        # Step 4: Evaluate the expression step by step
        print(f"Стъпка: {expr}")

        # Step 5: Simplify and solve
        simplified_expr = expr.simplify()
        print(f"Стъпка: {simplified_expr}")

        # Step 6: Display the final result
        print(f"Резултат: {simplified_expr}")

    except Exception as e:
        print(f"Грешка: Невалидна математическа задача. ({str(e)})")

# Main function
def main():
    # Example input
    problem = input("Въведете задачата: ")
    solve_problem(problem)

# Run the program
if __name__ == "__main__":
    main()