import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('.form-body');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const params = {
                email: email,
                senha: senha
            };

            try {
                const response = await api.postWithParams('/usuarios/login/gestor', params);

                if (response.ok) {
                    const gestor = await response.json();

                    localStorage.setItem('gestorLogado', JSON.stringify(gestor));

                    window.location.href = 'dashboardFuncionario.html';
                } else {
                    const errorMsg = await response.text();
                    alert(`Erro ao acessar: ${errorMsg}`);
                }
            } catch (error) {
                console.error("Erro no login:", error);
                alert("Falha de conexão com o servidor.");
            }
        });
    }
});