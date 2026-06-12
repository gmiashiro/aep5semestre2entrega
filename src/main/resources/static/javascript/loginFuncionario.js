import { api } from './api.js';
import {mostrarNotificacao} from "./notificacao.js";

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('.form-body');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;

            if (!email || !senha) {
                mostrarNotificacao("Por favor, preencha todos os campos.", "aviso");
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
                    localStorage.removeItem('usuarioLogado');
                    localStorage.removeItem('cpfUsuario');
                    localStorage.setItem('gestorLogado', JSON.stringify(gestor));

                    window.location.href = 'dashboardFuncionario.html';
                } else {
                    const errorMsg = await response.text();
                    mostrarNotificacao(`Erro ao acessar: ${errorMsg}`, "erro");
                }
            } catch (error) {
                console.error("Erro no login:", error);
                mostrarNotificacao("Falha de conexão com o servidor.", "erro");
            }
        });
    }
});