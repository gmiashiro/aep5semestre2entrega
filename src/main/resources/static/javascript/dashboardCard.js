
document.addEventListener('click', function(e) {
    const cardClicado = e.target.closest('.card');

    if (cardClicado) {
        cardClicado.classList.toggle('expanded');
    }
});

const statusStyleMap = {
    1: "fill-25",
    2: "fill-50",
    3: "fill-75",
    4: "fill-100",
};

const phaseProgressStyleMap = {
    1: "open",
    2: "in-progress",
    3: "in-progress",
    4: "done",
    5: "canceled"
};

const priorityStyleMap = {
    1: "low",
    2: "normal",
    3: "high",
    4: "urgent"
};

const cardBackgroundStyleMap = {
    1: "blue-card-background",
    2: "yellow-card-background",
    3: "yellow-card-background",
    4: "green-card-background",
    5: "red-card-background"
};

const progressBarStyleMap = {
    1: "blue-progress-bar",
    2: "yellow-progress-bar",
    3: "yellow-progress-bar",
    4: "green-progress-bar",
    5: "red-progress-bar"
};

const categoryStyleMap = {
    1: "light",
    2: "road",
    3: "grass",
    4: "bus",
    5: "other"
};

const priorityTagMap = {
    1: "Baixo",
    2: "Normal",
    3: "Alto",
    4: "Urgente"
};

const progressTagMap = {
    1: "Aberto",
    2: "Triagem",
    3: "Em progresso",
    4: "Feito",
    5: "Cancelado"
};



// const cardData = {
//     id: 1, 
//     status: 1,
//     priority: 1, 
//     title: "Apenas testando",
//     address: "Rua teste, 123", 
//     category: 1,
//     phase: 1, 
//     description: "Isso é uma descrição",
//     justification: "Está em teste ainda", 
//     employee: "Tester",
//     dateCreated: 1, 
//     dateUpdated: 1,
//     dateDeadline: 1, 
//     addDeadlineAlert: true,
// }


function createCard(cardData, isGestorDashboard, isDefaultExpanded) {

    // Cria o card
    const card = document.createElement("div");
    card.classList.add(
        "shadow-box", 
        "reduced-card",
        "card",
        cardBackgroundStyleMap[cardData.status]
    );

    // Cria a primeira linha
    /*
    ESTRUTURA:
    <div class="first-line-container">
        <div class="first-line-number">
            <div class="class-icon">
                <img src="../assets/icons/light.svg" alt="Ícone da classificação de iluminação">
            </div>
            <span>N° 1234</span>
        </div>
        <div class="round-container status">
            <span>Em andamento</span>
        </div>
    </div>
    */
    const firstLineContainer = document.createElement("div");
    firstLineContainer.classList.add("first-line-container");

    const firstLineProtocolContainer = document.createElement("div");
    firstLineProtocolContainer.classList.add("first-line-number");

    const categoryIconContainer = document.createElement("div");
    categoryIconContainer.classList.add(
        "class-icon",
        categoryStyleMap[cardData.category]
    );
    const categoryIcon = document.createElement("img");
    categoryIcon.src = "../assets/icons/" + categoryStyleMap[cardData.category] + ".svg";
    categoryIconContainer.appendChild(categoryIcon);

    const protocolNumber = document.createElement("span");
    protocolNumber.innerText = "N° " + cardData.id;

    firstLineProtocolContainer.appendChild(categoryIconContainer);
    firstLineProtocolContainer.appendChild(protocolNumber);
    firstLineContainer.appendChild(firstLineProtocolContainer);

    const statusContainer = document.createElement("div");
    statusContainer.classList.add(
        "round-container",
        "status",
        phaseProgressStyleMap[cardData.phase]
    )
    const statusLabel = document.createElement("span");
    statusLabel.innerText = progressTagMap[cardData.phase];
    statusContainer.appendChild(statusLabel);
    firstLineContainer.appendChild(statusContainer);

    card.appendChild(firstLineContainer);

    // Cria a segunda linha
    /*
    ESTRUTURA:
    <div class="second-line-container">
        <div class="round-container">
            <span>Alta</span>
        </div>
        <div class="round-container deadline-box">
            <img src="../assets/icons/alarmBlack.svg" alt="Ícone de despertador">
            <span>Falta 10 dias</span>
        </div>
    </div>
    */
    const secondLineContainer = document.createElement("div");
    secondLineContainer.classList.add("second-line-container");

    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add(
        "round-container",
        priorityStyleMap[cardData.priority]
    );
    const priorityLabel = document.createElement("span");
    priorityLabel.innerText = priorityTagMap[cardData.priority];
    priorityContainer.appendChild(priorityLabel);
    secondLineContainer.appendChild(priorityContainer);

    if (cardData.addDeadlineAlert) {
        const deadlineAlertContainer = document.createElement("div");
        deadlineAlertContainer.classList.add(
            "round-container",
            "deadline-box",
            priorityStyleMap[cardData.priority]
        );
        const deadlineAlertIcon = document.createElement("img");
        deadlineAlertIcon.src = "../assets/icons/alarmBlack.svg";
        deadlineAlertContainer.appendChild(deadlineAlertIcon);
        const deadlineAlertDate = document.createElement("span");
        deadlineAlertDate.innerText = "Prazo: " + cardData.dateDeadline;
        deadlineAlertContainer.appendChild(deadlineAlertDate);

        secondLineContainer.appendChild(deadlineAlertContainer);
    }

    card.appendChild(secondLineContainer);
    

    // Cria a terceira linha
    /*
    ESTRUTURA:
    <div class="third-line-container">
        <div>
            <h4>Poste sem lâmpada</h4>
        </div>
        <div class="third-line-address-container">
            <img src="../assets/icons/adress.svg" alt="Ícone de localização" class="icon">
            <span>Rua teste, 1234</span>
        </div>
    </div>
    */
    const thirdLineContainer = document.createElement("div");
    thirdLineContainer.classList.add("third-line-container");

    const titleContainer = document.createElement("div");
    const titleLabel = document.createElement("h4");
    titleLabel.innerText = cardData.title;
    titleContainer.appendChild(titleLabel);
    thirdLineContainer.appendChild(titleContainer);

    const addressContainer = document.createElement("div");
    addressContainer.classList.add("third-line-address-container");
    const adressIcon = document.createElement("img");
    adressIcon.src = "../assets/icons/adress.svg";
    adressIcon.classList.add("icon");
    addressContainer.appendChild(adressIcon);
    const addressLabel = document.createElement("span");
    addressLabel.innerText = cardData.address;
    addressContainer.appendChild(addressLabel);
    thirdLineContainer.appendChild(addressContainer);

    card.appendChild(thirdLineContainer);


    // Cria a quarta linha
    /*
    ESTRUTURA:
    <div class="fourth-line-container">
        <div class="label-container">
            <span>Progresso</span>
            <span>Etapa 3 de 4</span>
        </div>
        <div>
            <div class="progress">
                <div class="progress-fill fill-75"></div>
            </div>
        </div>
    </div>
    */
    const fourthLineContainer = document.createElement("div");
    fourthLineContainer.classList.add("fourth-line-container");

    const progressLabelContainer = document.createElement("div");
    progressLabelContainer.classList.add("label-container");
    const progressLabel = document.createElement("span");
    progressLabel.innerText = "Progresso";
    progressLabelContainer.appendChild(progressLabel);
    const phaseLabel = document.createElement("span");
    if (cardData.phase == 5) {
        phaseLabel.innerText = "Cancelado";
    } else {
        phaseLabel.innerText = "Etapa " + cardData.phase + " de 4";
    }
    progressLabelContainer.appendChild(phaseLabel);
    fourthLineContainer.appendChild(progressLabelContainer);

    const progressContainer = document.createElement("div");
    const progressBarBackground = document.createElement("div");
    progressBarBackground.classList.add("progress");
    const progressBarFill = document.createElement("div");
    progressBarFill.classList.add(
        "progress-fill",
        statusStyleMap[cardData.status],
        progressBarStyleMap[cardData.status]
    );
    progressBarBackground.appendChild(progressBarFill);
    progressContainer.appendChild(progressBarBackground);
    fourthLineContainer.appendChild(progressContainer);

    card.appendChild(fourthLineContainer);

    // Cria a quinta linha card reduzido
    /*
    ESTRUTURA:
    <div class="fifth-line-expand-container">
        <span>Ver mais</span>
    </div>
    */

    const fifthLineContainer = document.createElement("div");
    fifthLineContainer.classList.add("fifth-line-expand-container");
    const expandLabel = document.createElement("span");
    expandLabel.innerText = "Ver mais";
    fifthLineContainer.appendChild(expandLabel);
    card.appendChild(fifthLineContainer);

    // Cria a parte escondida
    const expandedPartContainer = document.createElement("div");
    expandedPartContainer.classList.add("extra-content");
    card.appendChild(expandedPartContainer);

    // Cria um wrapper para a parte escondida
    const expandedPartWrapper = document.createElement("div");

    if(!isDefaultExpanded) {
        expandedPartWrapper.classList.add("extra-content-wrapper");
    } else {
        card.classList.add("expanded");
    }

    expandedPartContainer.appendChild(expandedPartWrapper);

    // Quinta linha nova
    const lineBreak = document.createElement("hr");
    expandedPartWrapper.appendChild(lineBreak);

    // Cria a sexta linha
    /*
    ESTRUTURA:
    <div class="sixth-line-container">
        <div class="text-container">
            <span class="text-title">Descrição:</span>
            <span class="text-info">Uai a descrição vai aqui</span>
        </div>
        <div>
            <div class="text-container">
                <span class="text-title">Justificativa:</span>
                <span class="text-info">Uai a justificativa vai aqui</span>
            </div>
            <div class="employee-info-container">
                <img src="../assets/icons/employee.svg" alt="Ícone de um funcionário" class="icon">
                <span>Responsável: </span>
            </div>
        </div>
    </div>
    */
    const sixthLineContainer = document.createElement("div");
    sixthLineContainer.classList.add("sixth-line-container");
    expandedPartWrapper.appendChild(sixthLineContainer);

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("text-container");
    sixthLineContainer.appendChild(descriptionContainer);
    const descriptionLabel = document.createElement("span");
    descriptionLabel.classList.add("text-title");
    descriptionLabel.innerText = "Descrição:";
    const descriptionText = document.createElement("span");
    descriptionText.classList.add("text-info");
    descriptionText.innerText = cardData.description;
    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionText);

    const justificationAreaContainer = document.createElement("div");

    const justificationTextContainer = document.createElement("div");
    justificationTextContainer.classList.add("text-container");
    const justificationLabel = document.createElement("span");
    justificationLabel.classList.add("text-title");
    justificationLabel.innerText = "Justificativa:";
    const justificationText = document.createElement("span");
    justificationText.classList.add("text-info");
    justificationText.innerText = cardData.justification;
    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionText);
    justificationTextContainer.appendChild(justificationLabel);
    justificationTextContainer.appendChild(justificationText);
    justificationAreaContainer.appendChild(justificationTextContainer);

    const justificationEmployeeContainer = document.createElement("div");
    justificationEmployeeContainer.classList.add("employee-info-container");
    justificationAreaContainer.appendChild(justificationEmployeeContainer);
    sixthLineContainer.appendChild(justificationAreaContainer);
    expandedPartWrapper.appendChild(sixthLineContainer);

    // Cria a sétima linha
    /*
    ESTRUTURA:
    <div class="seventh-line-container">
        <div class="date-container">
            <img src="../assets/icons/timeCreated.svg" alt="Ícone para a data de criação" class="iconDate">
            <span>Criado em: 10/10/2023</span>
        </div>
        <div class="date-container">
            <img src="../assets/icons/timeUpdated.svg" alt="Ícone para a data de atualização" class="iconDate">
            <span>Atualizado em: 10/10/2023</span>
        </div>
        <div class="date-container">
            <img src="../assets/icons/alarmGrey.svg" alt="Ícone para o fim do prazo de resolução" class="iconDate">
            <span class="deadline-text">Prazo de resolução: 10/10/2023</span>
        </div>
    </div>
    */
    const seventhLineContainer = document.createElement("div");
    seventhLineContainer.classList.add("seventh-line-container");

    const createdDateContainer = document.createElement("div");
    createdDateContainer.classList.add("date-container");

    const createdDateIcon = document.createElement("img");
    createdDateIcon.src = "../assets/icons/timeCreated.svg";
    createdDateIcon.alt = "Ícone para a data de criação";
    createdDateIcon.classList.add("iconDate");
    createdDateContainer.appendChild(createdDateIcon);

    const createdDateLabel = document.createElement("span");
    createdDateLabel.innerText = `Criado em: ${cardData.dateCreated}`;
    createdDateLabel.innerText = "Criado em: " + cardData.dateCreated;
    createdDateContainer.appendChild(createdDateLabel);

    seventhLineContainer.appendChild(createdDateContainer);

    const deadlineContainer = document.createElement("div");
    deadlineContainer.classList.add("date-container");

    const deadlineIcon = document.createElement("img");
    deadlineIcon.src = "../assets/icons/alarmGrey.svg";
    deadlineIcon.alt = "Ícone para o fim do prazo de resolução";
    deadlineIcon.classList.add("iconDate");
    deadlineContainer.appendChild(deadlineIcon);

    const deadlineLabel = document.createElement("span");
    deadlineLabel.classList.add("deadline-text");
    deadlineLabel.innerText = "Prazo de resolução: " + cardData.dateDeadline;
    deadlineContainer.appendChild(deadlineLabel);

    seventhLineContainer.appendChild(deadlineContainer);

    expandedPartWrapper.appendChild(seventhLineContainer);

    // Cria a última linha
    /*
    ESTRUTURA:
    <div class="finalLineContainer">
        <button onclick="atualizarCard()">Atualizar</button>
    </div>
    */

    if (isGestorDashboard) {
        const finalLineContainer = document.createElement("div");
        finalLineContainer.classList.add("finalLineContainer");

        const updateButton = document.createElement("button");
        updateButton.classList.add("update-button");
        updateButton.id = cardData.id;
        updateButton.innerText = "Atualizar";

        updateButton.addEventListener("click", () => {
            window.location.href = "formsAtualizacaoSolicitacao.html?protocolo=" + cardData.id;
        });

        finalLineContainer.appendChild(updateButton);

        // sempre adicionar
        expandedPartWrapper.appendChild(finalLineContainer);
    }
    

    return card;
}

export function formatAndRenderSingleCard(cardOriginal, container, isGestorDashboard, isDefaultExpanded) {

    console.log(cardOriginal);

    if (typeof cardOriginal === "object") {
        console.log("É um objeto");
    } else{

    }

    const card = {
                id: cardOriginal.protocolo, 
                status: cardOriginal.status,
                priority: cardOriginal.prioridade, 
                title: cardOriginal.titulo,
                address: cardOriginal.rua + ", " + cardOriginal.numero + ", " + cardOriginal.bairro, 
                category: cardOriginal.categoria,
                phase: cardOriginal.status, 
                description: cardOriginal.descricao,
                justification: cardOriginal.justificativa || "Essa solicitação ainda não recebeu nenhuma atualização", 
                dateCreated: new Date(cardOriginal.dataCriacao).toLocaleDateString("pt-BR"), 
                dateDeadline: new Date(cardOriginal.prazoSLA).toLocaleDateString("pt-BR"), 
                addDeadlineAlert: false
            }

    container.appendChild(createCard(card, isGestorDashboard, isDefaultExpanded));
}


export function formatAndRenderCards(cardsOriginal, container, isGestorDashboard, isDefaultExpanded) {
    const formattedCards = [];
    console.log(cardsOriginal);

    
    cardsOriginal.forEach(card => {
        formattedCards.push(
            {
                id: card.protocolo, 
                status: card.status,
                priority: card.prioridade, 
                title: card.titulo,
                address: card.rua + ", " + card.numero + ", " + card.bairro, 
                category: card.categoria,
                phase: card.status, 
                description: card.descricao,
                justification: card.justificativa || "Essa solicitação ainda não recebeu nenhuma atualização", 
                dateCreated: new Date(card.dataCriacao).toLocaleDateString("pt-BR"), 
                dateDeadline: new Date(card.prazoSLA).toLocaleDateString("pt-BR"), 
                addDeadlineAlert: false
            }
        )
    });

    formattedCards.forEach(card => {
        container.appendChild(createCard(card, isGestorDashboard, isDefaultExpanded));
    });
}

// 0: 
// bairro: "Bairro dos testes"
// categoria: 3
// dataCriacao: "2026-06-12T01:11:19.242745"
// descricao: "Descricao bem descritiva"
// justificativa: null
// numero: "123"
// prazoSLA: "2026-07-12T01:11:19.242745"
// prioridade: 1
// protocolo: 1
// rua: "rua teste"
// status: 1
// titulo: "Titulo 1"
// usuario: {cpf: '012.345.678-90', id: 2}