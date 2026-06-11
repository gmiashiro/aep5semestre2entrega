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


    exitButton.addEventListener("click", () => {
        filterWindow.classList.toggle("hidden");
    })

    filterButton.addEventListener("click", () => {
        filterWindow.classList.toggle("hidden");
    })
    

    categoryButton.addEventListener("click", () => {
        categoryOptions.classList.toggle("hidden");
    })

    priorityButton.addEventListener("click", () => {
        priorityOptions.classList.toggle("hidden");
    })


    removeFilterButton.addEventListener("click", removeFilter)

    function showRemoveFilterContainer() {
        if (removeFilterContainer.classList.contains("hidden")) {
            removeFilterContainer.classList.toggle("hidden");
        }
    }

    function hideRemoveFilterContainer() {
        if (!removeFilterContainer.classList.contains("hidden")) {
            removeFilterContainer.classList.toggle("hidden");
        }
    }


    function removeFilter() {
        optionsFilterButtons.forEach(button => {
            button.classList.remove("selected-button");
            button.classList.add("unselected-filter-option");
        });
        
        hideRemoveFilterContainer();
    }

    function applyFilter(option) {
        showRemoveFilterContainer()
        console.log(option)
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
                applyFilter(button.textContent);
            } 

        });
    }); 
}


const filterContainers = document.querySelectorAll(".filter-container");

filterContainers.forEach(filterContainer => {
    initializeFilterContainer(filterContainer);
});


