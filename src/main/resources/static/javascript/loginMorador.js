import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login-cidadao');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputElement = document.getElementById('inputCpf');
            const cpfBruto = inputElement.value.trim();
            const mensagemErro = document.getElementById('mensagem-erro');

            mensagemErro.style.display = 'none';
            inputElement.classList.remove('input-error');

            if (!cpfBruto) {
                mostrarErro("Por favor, digite seu CPF.");
                return;
            }

            const cpfLimpo = cpfBruto.replace(/\D/g, '');

            try {
                const params = {
                    cpf: cpfLimpo
                };

                const response = await api.postWithParams('/usuarios/login/cidadao', params);

                if (response.ok) {
                    const cidadao = await response.json();
                    localStorage.removeItem('gestorLogado');
                    localStorage.setItem('usuarioLogado', JSON.stringify(cidadao));
                    localStorage.setItem('cpfUsuario', JSON.stringify(cpfLimpo));

                    window.location.href = 'landingPage.html';
                } else {
                    const errorMsg = await response.text();
                    mostrarErro(`Erro ao acessar: ${errorMsg}`);
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
});