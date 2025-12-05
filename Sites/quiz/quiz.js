function corriger() {
    let score = 0;
    const questions = document.querySelectorAll(".question");

    questions.forEach(q => {
        const correct = q.dataset.correct;
        const selected = q.querySelector("input[type='radio']:checked");

        const labels = q.querySelectorAll("label");
        labels.forEach(l => l.classList.remove("correct-answer", "wrong-answer"));

        if (selected) {
            if (selected.value === correct) {
                score++;
                selected.parentElement.classList.add("correct-answer");
            } else {
                selected.parentElement.classList.add("wrong-answer");
                q.querySelector(`input[value="${correct}"]`).parentElement.classList.add("correct-answer");
            }
        } else {
            q.querySelector(`input[value="${correct}"]`).parentElement.classList.add("correct-answer");
        }
    });

    document.getElementById("result").textContent = 
        "Score : " + score + " / " + questions.length;
}