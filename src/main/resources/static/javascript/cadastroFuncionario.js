import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.querySelector('.form-body');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const cargo = document.getElementById('cargo').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmacaoSenha = document.getElementById('confirmacaoSenha').value;

            if (senha !== confirmacaoSenha) {
                alert("As senhas não coincidem!");
                return;
            }

            const gestor = {
                nome: nome,
                cpf: cpf,
                cargo: cargo,
                email: email,
                senha: senha
            };

            try {
                const response = await api.post(`/usuarios/gestor?confirmacaoSenha=${encodeURIComponent(confirmacaoSenha)}`, gestor);

                if (response.ok) {
                    const novoGestor = await response.json();
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = 'loginFuncionario.html';
                } else {
                    const errorMsg = await response.text();
                    alert(`Erro ao cadastrar: ${errorMsg}`);
                }
            } catch (error) {
                alert("Falha de conexão com o servidor.");
            }
        });
    }
});