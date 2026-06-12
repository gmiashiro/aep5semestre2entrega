import { toggleProfileWindowLanding } from "./profileWindowLandingPage.js";

const usuarioMorador = JSON.parse(localStorage.getItem('usuarioLogado'));
const usuarioGestor = JSON.parse(localStorage.getItem('gestorLogado'));
const usuarioAtivo = usuarioMorador || usuarioGestor;

document.addEventListener('DOMContentLoaded', () => {
    const usuarioMorador = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarioGestor = JSON.parse(localStorage.getItem('gestorLogado'));
    const usuarioAtivo = usuarioMorador || usuarioGestor;
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log(usuarioLogado)

    const botoesCriar = document.querySelectorAll('.button-blue');

    botoesCriar.forEach(botao => {
        if (botao.textContent.includes('Criar solicitação')) {
            botao.addEventListener('click', (e) => {
                e.preventDefault();

                if (usuarioAtivo) {
                    if (usuarioAtivo == usuarioMorador) {
                        window.location.href = 'formsCriacaoSolicitacao.html';
                    } 
                } else {
                    window.location.href = 'loginMorador.html';
                }
            });
        }
    });

    const botoaoAcessarPainel = document.querySelector('.acess-dashboard');

    botoaoAcessarPainel.addEventListener("click", () => {
        if (usuarioLogado) {
            // LINK PROVISÓRIO
            window.location.href = 'dashboardFuncionario.html';
        } else {
            window.location.href = 'loginMorador.html';
        }
    })

    const btnPerfil = document.querySelector('.profile-button');

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            if (usuarioAtivo) {
                toggleProfileWindowLanding();
            } else {
                window.location.href = 'loginMorador.html';
            }
        });
    }
});