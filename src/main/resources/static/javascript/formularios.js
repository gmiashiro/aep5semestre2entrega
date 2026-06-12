document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll(".input-box");
    
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            const container = input.parentElement;
            const feedback = container.querySelector(".feedback");
            
            if (!input.checkValidity()) {
                input.classList.add("input-warning");
                feedback.innerText = "Esse campo é obrigatório";
                feedback.classList.add("input-message-warning");
                feedback.classList.remove("feedback-hidden");
            } else {
                feedback.classList.add("feedback-hidden");
                input.classList.remove("input-warning");
            }
        });
    });
})