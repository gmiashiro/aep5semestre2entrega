document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.querySelector(".profile-button");
    const popupWindow = document.querySelector(".profile-window-container");
    const exitWindowButton = document.querySelector(".exit-button");
    const cpfElement = document.querySelector(".cpf");

    const usuarioMorador = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarioGestor = JSON.parse(localStorage.getItem('gestorLogado'));

    const usuarioAtivo = usuarioMorador || usuarioGestor;

    if (usuarioAtivo && usuarioAtivo.cpf && cpfElement) {
        cpfElement.innerText = cpfElement.innerText + " " + formatarCpf(usuarioAtivo.cpf);
    }

    if (profileButton && popupWindow) {
        profileButton.addEventListener("click", () => {
            popupWindow.classList.toggle("window-hidden");
        });
    }

    if (exitWindowButton && popupWindow) {
        exitWindowButton.addEventListener("click", () => {
            popupWindow.classList.toggle("window-hidden");
        });
    }
});

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

    return cpfFormatado;
}