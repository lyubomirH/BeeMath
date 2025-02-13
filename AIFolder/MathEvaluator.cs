using System;
using System.Data;

namespace AIPrototype
{
    public static class MathEvaluator
    {
        // Method to evaluate a mathematical expression
        public static double EvaluateExpression(string expression)
        {
            try
            {
                var result = new DataTable().Compute(expression, null);
                return Convert.ToDouble(result);
            }
            catch
            {
                Console.WriteLine("Error processing the expression.");
                return double.NaN;
            }
        }
    }
}