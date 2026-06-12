import { api } from './api.js';
import { formatAndRenderCards } from "./dashboardCard.js";

let filtroPesquisaProtocolo = "";

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoStr = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoStr) {
        window.location.href = 'loginMorador.html';
        return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoStr);

    const searchInput = document.querySelector(".search-container input");
    const searchButton = document.querySelector(".search-container button");
    const cardsContainer = document.querySelector(".cards-container");
    const noCardContainer = document.querySelector(".noCard-container");

    if (searchInput && searchButton) {
        searchButton.addEventListener("click", () => {
            filtroPesquisaProtocolo = searchInput.value.trim();
            carregarTickets();
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                filtroPesquisaProtocolo = searchInput.value.trim();
                carregarTickets();
            }
        });

        searchInput.addEventListener("input", () => {
            if (searchInput.value.trim() === "") {
                filtroPesquisaProtocolo = "";
                carregarTickets();
            }
        });
    }

    async function carregarTickets() {
        try {
            const response = await api.get(`/tickets/usuario/${usuarioLogado.id}`);

            if (response.status === 204 || !response.ok) {
                renderizarCards([]);
                return;
            }

            let ticketsFiltrados = await response.json();

            if (filtroPesquisaProtocolo !== "") {
                ticketsFiltrados = ticketsFiltrados.filter(t => String(t.protocolo) === filtroPesquisaProtocolo);
            }

            ticketsFiltrados.sort((a, b) => b.protocolo - a.protocolo);

            renderizarCards(ticketsFiltrados);

        } catch (error) {
            console.error("Erro ao carregar solicitações:", error);
            renderizarCards([]);
        }
    }

    function renderizarCards(tickets) {
        const cardsAntigos = cardsContainer.querySelectorAll('.card');
        cardsAntigos.forEach(c => c.remove());

        if (tickets.length === 0) {
            noCardContainer.classList.remove("hidden");
        } else {
            noCardContainer.classList.add("hidden");
            formatAndRenderCards(tickets, cardsContainer, false, false);
        }
    }

    carregarTickets();
});