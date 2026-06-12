import { api } from './api.js';
import { formatAndRenderCards } from "./dashboardCard.js";

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

    let todosTickets = [];

    if (searchInput && searchButton) {
        searchButton.addEventListener("click", () => aplicarFiltro(searchInput.value));

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') aplicarFiltro(searchInput.value);
        });

        searchInput.addEventListener("input", () => {
            if (searchInput.value.trim() === "") aplicarFiltro("");
        });
    }

    async function carregarTickets() {
        try {
            const response = await api.get(`/tickets/usuario/${usuarioLogado.id}`);

            if (response.status === 204 || !response.ok) {
                renderizarCards([]);
                return;
            }

            todosTickets = await response.json();

            todosTickets.sort((a, b) => b.protocolo - a.protocolo);

            renderizarCards(todosTickets);
        } catch (error) {
            console.error("Erro ao carregar solicitações:", error);
            renderizarCards([]);
        }
    }

    function aplicarFiltro(texto) {
        const textoLimpo = texto.trim();
        if (textoLimpo === "") {
            renderizarCards(todosTickets);
        } else {
            const filtrados = todosTickets.filter(t => String(t.protocolo) === textoLimpo);
            renderizarCards(filtrados);
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