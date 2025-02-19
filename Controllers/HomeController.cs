using Microsoft.AspNetCore.Mvc;
using MathAIProject.Models;
using MathAIProject.AI;

namespace MathAIProject.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SolveMath(string expression)
        {
            var model = new MathModel { Expression = expression };

            try
            {
                model.Result = MathSolver.Solve(expression);
            }
            catch
            {
                return BadRequest("Грешен израз!");
            }

            return Json(model);
        }
    }
}
