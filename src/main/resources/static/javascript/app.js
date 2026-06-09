const API_BASE_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', () => {

    const formLogin = document.getElementById('form-login-cidadao');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputElement = document.getElementById('inputCpf');
            const cpfValue = inputElement.value.trim();
            const mensagemErro = document.getElementById('mensagem-erro');

            mensagemErro.style.display = 'none';
            inputElement.classList.remove('input-error');

            if (!cpfValue) {
                mostrarErro("Por favor, digite seu CPF.");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/usuarios/login/cidadao?cpf=${encodeURIComponent(cpfValue)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const cidadao = await response.json();

                    localStorage.setItem('usuarioLogado', JSON.stringify(cidadao));

                    window.location.href = 'landingPage.html';
                } else {
                    mostrarErro("Erro ao realizar login. Verifique os dados.");
                }
            } catch (error) {
                console.error("Erro na comunicação:", error);
                mostrarErro("Falha de conexão com o servidor. O backend está rodando?");
            }
        });
    }

    function mostrarErro(mensagem) {
        const mensagemErro = document.getElementById('mensagem-erro');
        const inputElement = document.getElementById('inputCpf');

        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = 'block';
        inputElement.classList.add('input-error');
    }

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const botoesAcao = document.querySelectorAll('.button-blue');

    botoesAcao.forEach(botao => {
        if(botao.textContent.includes('Criar solicitação')) {
            if (usuarioLogado) {
                botao.href = 'criarTicket.html';
            } else {
                botao.href = 'loginMorador.html';
            }
        }
    });
});