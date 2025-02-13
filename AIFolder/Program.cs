using System;

namespace AIPrototype
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Write("Enter a mathematical expression (+, -, *, /) or 'exit' to quit: ");
                string input = Console.ReadLine();

                if (input.ToLower() == "exit")
                    break;

                double result = MathEvaluator.EvaluateExpression(input);
                if (!double.IsNaN(result))
                    Console.WriteLine($"Result: {result}");
            }
        }
    }
}