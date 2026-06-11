
document.addEventListener('click', function(e) {
    const cardClicado = e.target.closest('.card');

    if (cardClicado) {
        cardClicado.classList.toggle('expanded');
    }
});