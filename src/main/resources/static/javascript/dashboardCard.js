const cards = document.querySelectorAll(".shadow-box");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("expanded");
    });
});