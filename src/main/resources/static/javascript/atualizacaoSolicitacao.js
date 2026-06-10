import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {

    const gestorLogado = localStorage.getItem('gestorLogado');
    if (!gestorLogado) {
        alert("Acesso negado. Apenas funcionários podem atualizar solicitações.");
        window.location.href = 'loginFuncionario.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const protocolo = urlParams.get('protocolo');

    if (!protocolo) {
        alert("Nenhum protocolo informado para atualização.");
        window.location.href = 'dashboardFuncionario.html';
        return;
    }

    const formAtualizacao = document.getElementById('form-atualizacao');

    if (formAtualizacao) {
        formAtualizacao.addEventListener('submit', async (e) => {
            e.preventDefault();

            const statusValor = document.getElementById('novo-status').value;
            const justificativaTexto = document.getElementById('justificativa').value.trim();

            if (!statusValor || !justificativaTexto) {
                alert("Por favor, selecione um status e escreva uma justificativa.");
                return;
            }

            const atualizacaoDados = {
                status: parseInt(statusValor),
                justificativa: justificativaTexto
            };

            try {
                const response = await api.put(`/tickets/${protocolo}/status`, atualizacaoDados);

                if (response.ok) {
                    alert(`Solicitação Nº ${protocolo} atualizada com sucesso!`);
                    window.location.href = 'dashboardFuncionario.html';
                } else {
                    const errorMsg = await response.text();
                    alert(`Erro ao atualizar: ${errorMsg}`);
                }
            } catch (error) {
                console.error("Erro na atualização:", error);
                alert("Falha de conexão com o servidor.");
            }
        });
    }
});