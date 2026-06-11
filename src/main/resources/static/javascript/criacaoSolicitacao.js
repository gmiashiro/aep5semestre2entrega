import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoStr = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoStr) {
        alert("Você precisa estar logado para criar uma solicitação.");
        window.location.href = 'loginMorador.html';
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
                    alert(`Solicitação criada com sucesso! Protocolo: ${ticketCriado.protocolo}`);

                    window.location.href = 'landingPage.html';
                } else {
                    alert("Erro ao criar a solicitação. Verifique os dados.");
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Falha de conexão com o servidor.");
            }
        });
    }
});