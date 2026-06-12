import { toggleProfileWindowLanding } from "./profileWindowLandingPage.js";

document.addEventListener('DOMContentLoaded', () => {
    const usuarioMorador = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarioGestor = JSON.parse(localStorage.getItem('gestorLogado'));
    const usuarioAtivo = usuarioMorador || usuarioGestor;

    const textoEntrar = document.getElementById('texto-entrar');
    const btnPerfil = document.querySelector('.profile-button');
    const botoesCriar = document.querySelectorAll('.button-blue');
    const botoaoAcessarPainel = document.querySelector('.acess-dashboard');

    if (textoEntrar) {
        if (!usuarioAtivo) {
            textoEntrar.style.display = 'block';
        }

        textoEntrar.addEventListener('click', () => {
            window.location.href = 'loginMorador.html';
        });
    }

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            if (usuarioAtivo) {
                toggleProfileWindowLanding();
            } else {
                window.location.href = 'loginMorador.html';
            }
        });
    }

    botoesCriar.forEach(botao => {
        if (botao.textContent.includes('Criar solicitação')) {
            botao.addEventListener('click', (e) => {
                e.preventDefault();

                if (usuarioAtivo) {
                    if (usuarioAtivo.cpf && !usuarioAtivo.cargo) { // Confirma que é morador
                        window.location.href = 'formsCriacaoSolicitacao.html';
                    }
                } else {
                    window.location.href = 'loginMorador.html';
                }
            });
        }
    });

    if (botoaoAcessarPainel) {
        botoaoAcessarPainel.addEventListener("click", () => {
            if (usuarioAtivo) {
                if (usuarioGestor == null) {
                    window.location.href = 'dashboardMorador.html';
                } else {
                    window.location.href = 'dashboardFuncionario.html';
                }
            } else {
                window.location.href = 'loginMorador.html';
            }
        });
    }
});