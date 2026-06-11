const profileButton = document.querySelector(".profile-button");
const popupWindow = document.querySelector(".profile-window-container");
const exitWindowButton = document.querySelector(".exit-button");
const cpfUsuario = JSON.parse(localStorage.getItem('cpfUsuario'));
var cpfElement = document.querySelector(".cpf");
cpfElement.innerText = cpfElement.innerText + formatarCpf(cpfUsuario);

exitWindowButton.addEventListener("click", () => {
    popupWindow.classList.toggle("window-hidden");
})

export function toggleProfileWindowLanding() {
    const popupWindow = document.querySelector(".profile-window-container");
    popupWindow.classList.toggle("window-hidden");
}

function formatarCpf(cpf) {
    var cpfFormatado = "";  // 01234567890

    var x = 0;
    do {
        if (cpfFormatado.length == 3 || cpfFormatado.length == 7) {
            cpfFormatado += ".";
        } else if (cpfFormatado.length == 10) {
            cpfFormatado += "-";
        } else {
            cpfFormatado += cpf.charAt(x);
            x++;
        }
    } while (cpfFormatado.length != 13);

    // 0 1 2 . 3 4 5 . 6 7 8 - 9 0
    return cpfFormatado;
}


