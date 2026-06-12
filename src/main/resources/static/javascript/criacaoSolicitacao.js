import { api } from './api.js';
import { mostrarNotificacao } from './notificacao.js';

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoStr = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoStr) {
        mostrarNotificacao("Você precisa estar logado para criar uma solicitação.", "aviso", 2000, () => {
            window.location.href = 'loginMorador.html';
        });
        return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoStr);
    const formCriacao = document.querySelector('.form-body');

    if (formCriacao) {
        formCriacao.addEventListener('submit', async (e) => {
            e.preventDefault();

            const titulo = document.getElementById('titulo').value.trim();
            const descricao = document.getElementById('descricao').value.trim();
            const rua = document.getElementById('rua').value.trim();
            const numero = document.getElementById('numero').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const categoriaId = document.getElementById('categoria').value;
            const prioridadeId = document.getElementById('prioridade').value;

            if (!titulo || !descricao || !rua || !numero || !bairro || !categoriaId || !prioridadeId) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const ticket = {
                titulo: titulo,
                descricao: descricao,
                rua: rua,
                numero: numero,
                bairro: bairro,
                categoria: parseInt(categoriaId),
                prioridade: parseInt(prioridadeId)
            };

            try {
                const response = await api.post(`/tickets/usuario/${usuarioLogado.id}`, ticket);

                if (response.ok) {
                    const ticketCriado = await response.json();
                    mostrarNotificacao(`Solicitação criada com sucesso! Protocolo: ${ticketCriado.protocolo}`, "sucesso", 2500, () => {
                        window.location.href = 'landingPage.html';
                    });

                    window.location.href = 'landingPage.html';
                } else {
                    mostrarNotificacao("Erro ao criar a solicitação. Verifique os dados.", "erro");
                }
            } catch (error) {
                console.error("Erro:", error);
                mostrarNotificacao("Falha de conexão com o servidor.", "erro");
            }
        });
    }
});