const buttons = document.querySelectorAll(".boxed-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => {
            btn.classList.remove("selected-button");
            btn.classList.add("unselected-button");
        });

        button.classList.remove("unselected-button");
        button.classList.add("selected-button");
    });
});