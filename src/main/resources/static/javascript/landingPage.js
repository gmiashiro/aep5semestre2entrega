
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const botoesCriar = document.querySelectorAll('.button-blue');

    botoesCriar.forEach(botao => {
        if (botao.textContent.includes('Criar solicitação')) {
            botao.addEventListener('click', (e) => {
                e.preventDefault();

                if (usuarioLogado) {
                    window.location.href = 'formsCriacaoSolicitacao.html';
                } else {
                    window.location.href = 'loginMorador.html';
                }
            });
        }
    });

    const btnPerfil = document.querySelector('.profile-button');

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            if (usuarioLogado) {
                const desejaSair = confirm("Deseja sair da sua conta ObservaAção?");
                if (desejaSair) {
                    localStorage.removeItem('usuarioLogado');
                    window.location.reload();
                }
            } else {
                window.location.href = 'loginMorador.html';
            }
        });
    }
});