import { api } from './api.js';

let filtroCategoriaAtual = null;
let filtroPrioridadeAtual = null;

const mapaCategorias = {
    "Iluminação": 1,
    "Asfalto": 2,
    "Grama": 3,
    "Ponto de ônibus": 4,
    "Outro": 5
};

const mapaPrioridades = {
    "Baixa": 1,
    "Normal": 2,
    "Alta": 3,
    "Urgente": 4
};

document.addEventListener('DOMContentLoaded', () => {
    const gestorLogadoStr = localStorage.getItem('gestorLogado');
    if (!gestorLogadoStr) {
        window.location.href = 'loginFuncionario.html';
        return;
    }

    carregarTickets();

    const buttons = document.querySelectorAll(".boxed-button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => {
                btn.classList.remove("selected-button");
                btn.classList.add("unselected-button");
            });
            button.classList.remove("unselected-button");
            button.classList.add("selected-button");
        });
    });

    const filterContainers = document.querySelectorAll(".filter-container");
    filterContainers.forEach(filterContainer => {
        initializeFilterContainer(filterContainer);
    });
});

async function carregarTickets() {
    let url = '/tickets';
    const params = new URLSearchParams();

    if (filtroCategoriaAtual) params.append('categoria', filtroCategoriaAtual);
    if (filtroPrioridadeAtual) params.append('prioridade', filtroPrioridadeAtual);

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await api.get(url);

        if (response.status === 204 || !response.ok) {
            chamarRenderizacaoExterna([], [], []);
            return;
        }

        const todosTickets = await response.json();

        const pendentes = todosTickets.filter(t => t.status === 1 || t.status === 2 || t.status === 3);
        const concluidas = todosTickets.filter(t => t.status === 4);
        const canceladas = todosTickets.filter(t => t.status === 5);

        chamarRenderizacaoExterna(pendentes, concluidas, canceladas);

    } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
    }
}

function RenderizarCards(pendentes, concluidas, canceladas) {
    console.log("Tickets Pendentes recebidos:", pendentes);
    console.log("Tickets Concluídas recebidos:", concluidas);
    console.log("Tickets Canceladas recebidos:", canceladas);
}

function initializeFilterContainer(filterContainer) {
    const filterButton = filterContainer.querySelector(".filter-button");
    const filterWindow = filterContainer.querySelector(".filter-window");
    const exitButton = filterContainer.querySelector(".exit-filter");
    const categoryButton = filterContainer.querySelector(".category");
    const categoryOptions = filterContainer.querySelector(".category-options");
    const priorityButton = filterContainer.querySelector(".priority");
    const priorityOptions = filterContainer.querySelector(".priority-options");
    const removeFilterContainer = filterContainer.querySelector(".clean-button-container");
    const removeFilterButton = filterContainer.querySelector(".clean-button");
    const optionsFilterButtons = filterContainer.querySelectorAll(".option-button");


    if (exitButton) {
        exitButton.addEventListener("click", () => {
            filterWindow.classList.toggle("hidden");
        });
    }

    if (filterButton) {
        filterButton.addEventListener("click", () => {
            filterWindow.classList.toggle("hidden");
        });
    }
    
    if(categoryButton){
        categoryButton.addEventListener("click", () => {
            categoryOptions.classList.toggle("hidden");
        })
    }

    if(priorityButton){
        priorityButton.addEventListener("click", () => {
            priorityOptions.classList.toggle("hidden");
        })
    }

    removeFilterButton.addEventListener("click", removeFilter)

    function showRemoveFilterContainer() {
        if (removeFilterContainer) removeFilterContainer.classList.remove("hidden");
    }

    function hideRemoveFilterContainer() {
        if (removeFilterContainer) removeFilterContainer.classList.add("hidden");
    }

    if (removeFilterButton) {
        removeFilterButton.addEventListener("click", () => {
            removeFilter();
        });
    }

    function removeFilter() {
        optionsFilterButtons.forEach(button => {
            button.classList.remove("selected-button");
            button.classList.add("unselected-filter-option");
        });
        
        hideRemoveFilterContainer();
        filtroCategoriaAtual = null;
        filtroPrioridadeAtual = null;
        carregarTickets();
    }

    function applyFilter(option) {
        showRemoveFilterContainer();

        if (mapaCategorias[option]) {
            filtroCategoriaAtual = mapaCategorias[option];
        } else if (mapaPrioridades[option]) {
            filtroPrioridadeAtual = mapaPrioridades[option];
        }

        carregarTickets();
    }


    optionsFilterButtons.forEach(button => {
        button.addEventListener("click", () => {
            optionsFilterButtons.forEach(btn => {

                if (button != btn) {
                    if (btn.classList.contains("selected-button")) {
                        btn.classList.remove("selected-button");
                        btn.classList.add("unselected-filter-option");
                    }
                }
                
            });

            if (button.classList.contains("selected-button")) {
                button.classList.remove("selected-button");
                button.classList.add("unselected-filter-option");
                removeFilter();
                
            } else {
                button.classList.remove("unselected-filter-option");
                button.classList.add("selected-button");
                applyFilter(button.textContent.trim());
            } 

        });
    }); 
}

