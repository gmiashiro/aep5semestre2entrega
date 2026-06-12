import { api } from './api.js';
import { mostrarNotificacao } from './notificacao.js';
import {formatAndRenderSingleCard} from "./dashboardCard.js";

document.addEventListener('DOMContentLoaded', () => {

    const gestorLogado = localStorage.getItem('gestorLogado');
    if (!gestorLogado) {
        mostrarNotificacao("Acesso negado. Apenas funcionários podem atualizar.", "erro", 2000, () => {
            window.location.href = 'loginFuncionario.html';
        });
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const protocolo = urlParams.get('protocolo');
    console.log(protocolo);

    if (!protocolo) {
        mostrarNotificacao("Nenhum protocolo informado para atualização.", "aviso", 1500, () => {
            window.location.href = 'dashboardFuncionario.html';
        });
        return;
    } else {
        const cardContainer = document.querySelector(".boxes-container");
        // const cardContainerContent = document.querySelector(".form-container");
        // cardContainer.removeChild(cardContainerContent);
        carregarTicket(protocolo, cardContainer);
        // cardContainer.appendChild(cardContainerContent);
    }

    
    const formAtualizacao = document.getElementById('form-atualizacao');

    if (formAtualizacao) {
        formAtualizacao.addEventListener('submit', async (e) => {
            e.preventDefault();

            const statusValor = document.getElementById('novo-status').value;
            const justificativaTexto = document.getElementById('justificativa').value.trim();

            if (!statusValor || !justificativaTexto) {
                mostrarNotificacao("Por favor, selecione um status e escreva uma justificativa.", "aviso");
                return;
            }

            const atualizacaoDados = {
                status: parseInt(statusValor),
                justificativa: justificativaTexto
            };

            try {
                const response = await api.put(`/tickets/${protocolo}/status`, atualizacaoDados);

                if (response.ok) {
                    mostrarNotificacao(`Solicitação Nº ${protocolo} atualizada com sucesso!`, "sucesso", 2000, () => {
                        window.location.href = 'dashboardFuncionario.html';
                    });
                } else {
                    const errorMsg = await response.text();
                    mostrarNotificacao(`Erro ao atualizar: ${errorMsg}`, "erro");
                }
            } catch (error) {
                console.error("Erro na atualização:", error);
                mostrarNotificacao("Falha de conexão com o servidor.", "erro");
            }
        });
    }
});

async function carregarTicket(protocolo, container) {
    let url = "/tickets/" + protocolo;

    console.log(protocolo);
    console.log(url);

    try {
        const response = await api.get(url);

        if (response.status === 204 || !response.ok) {
            return;
        }

        const ticket = await response.json();

        formatAndRenderSingleCard(ticket, container, false, true);

    } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
    }
}
