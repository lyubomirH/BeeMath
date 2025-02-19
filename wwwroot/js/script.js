function solveMath() {
    let expression = document.getElementById("mathInput").value;

    fetch("../../AI/SolveMath", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "expression=" + encodeURIComponent(expression)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = "Резултат: " + data.result;
    })
    .catch(error => {
        document.getElementById("result").innerText = "Грешка при изчислението!";
    });
}
