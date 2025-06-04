document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const resultSection = document.querySelector('.result-section');
    const recognizedText = document.getElementById('recognizedText');
    const solveButton = document.getElementById('solveButton');
    const solution = document.getElementById('solution');

    uploadButton.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Показване на превю
            preview.style.display = 'block';
            preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Preview">`;

            // Изпращане на снимката към API
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('/process_image', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (data.text) {
                    resultSection.style.display = 'block';
                    recognizedText.textContent = data.text;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Грешка при обработката на снимката');
            }
        }
    });

    solveButton.addEventListener('click', async () => {
        const problem = recognizedText.textContent;
        try {
            const response = await fetch('/solve_problem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problem })
            });

            const data = await response.json();
            if (data.solution) {
                solution.innerHTML = data.solution;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Грешка при решаването на задачата');
        }
    });
});