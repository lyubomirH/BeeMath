using System;
using System.Data;

namespace MathAIProject.AI
{
    public static class MathSolver
    {
        public static double Solve(string expression)
        {
            try
            {
                var dataTable = new DataTable();
                return Convert.ToDouble(dataTable.Compute(expression, ""));
            }
            catch
            {
                throw new Exception("Невалиден математически израз!");
            }
        }
    }
}
