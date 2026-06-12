import { mostrarNotificacao } from './notificacao.js';

const profileButton = document.querySelector(".profile-button");
const popupWindow = document.querySelector(".profile-window-container");
const exitWindowButton = document.querySelector(".exit-button");
const exitAllButton = document.querySelector(".exit-all-button");
const cpfUsuario = JSON.parse(localStorage.getItem('cpfUsuario'));
var cpfElement = document.querySelector(".cpf");
if (cpfUsuario && cpfElement) {
    cpfElement.innerText = cpfElement.innerText + formatarCpf(cpfUsuario);
}

if (exitAllButton) {
    exitAllButton.addEventListener("click", () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('cpfUsuario');
        localStorage.removeItem('gestorLogado');
        mostrarNotificacao("Você saiu do sistema com sucesso.", "sucesso", 1500, () => {
            window.location.href = 'loginMorador.html';
        });
    });
}

exitWindowButton.addEventListener("click", () => {
    popupWindow.classList.toggle("window-hidden");
})

export function toggleProfileWindowLanding() {
    const popupWindow = document.querySelector(".profile-window-container");
    popupWindow.classList.toggle("window-hidden");
}

function formatarCpf(cpf) {
    if (!cpf) return "";

    const cpfLimpo = String(cpf).replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        return cpf;
    }

    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}


