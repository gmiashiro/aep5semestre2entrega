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

    const textoEntrar = document.getElementById('texto-entrar');
    if (!usuarioAtivo && textoEntrar) {
        textoEntrar.style.display = 'block';
    }

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

        if (usuarioAtivo) {
            console.log(usuarioAtivo)
            console.log(usuarioMorador)
            console.log(usuarioGestor)
            if (usuarioGestor == null) {
                console.log("era para ter dado certo")
                window.location.href = 'dashboardMorador.html';
            } else {
                window.location.href = 'dashboardFuncionario.html';
            }
        } else {
            window.location.href = 'loginMorador.html';
        }
    })

    const btnPerfil = document.querySelector('.profile-button');

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            if (usuarioAtivo) {
                console.log(usuarioAtivo)
                toggleProfileWindowLanding();
            } else {
                window.location.href = 'loginMorador.html';
            }
        });
    }
});