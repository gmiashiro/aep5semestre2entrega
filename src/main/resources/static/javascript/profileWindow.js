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

    const exitAllButton = document.querySelector(".exit-all-button");

    if (exitAllButton) {
        exitAllButton.addEventListener("click", () => {
            // Remove as chaves específicas do localStorage
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('cpfUsuario');
            localStorage.removeItem('gestorLogado');

            // Alternativamente, você pode usar localStorage.clear(); para apagar tudo de uma vez

            alert("Você saiu do sistema com sucesso.");
            // Redireciona para a página inicial ou de login
            window.location.href = 'landingPage.html';
        });
    }
});

function formatarCpf(cpf) {
    if (!cpf) return "";

    const cpfLimpo = String(cpf).replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        return cpf;
    }

    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}