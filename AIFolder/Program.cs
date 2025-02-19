using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Добавяне на услуги за контролери
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapPost("/solve", async context =>
    {
        // Прочитане на JSON данните от заявката
        var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
        var requestData = JsonConvert.DeserializeObject<MathProblemRequest>(requestBody);

        // Решаване на математическата задача
        var result = SolveMathProblem(requestData.Problem);

        // Връщане на резултата като JSON
        var response = new { result = result };
        await context.Response.WriteAsJsonAsync(response);
    });
});

app.Run();

string SolveMathProblem(string problem)
{
    try
    {
        // Използваме DataTable.Compute за решаване на математически изрази
        var result = new System.Data.DataTable().Compute(problem, null);
        return result.ToString();
    }
    catch (Exception e)
    {
        return $"Грешка: {e.Message}";
    }
}

public class MathProblemRequest
{
    public string Problem { get; set; }
}