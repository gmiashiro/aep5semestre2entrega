const profileButton = document.querySelector(".profile-button");
const popupWindow = document.querySelector(".profile-window-container");
const exitWindowButton = document.querySelector(".exit-button");

profileButton.addEventListener("click", () => {
    popupWindow.classList.toggle("window-hidden");
});

exitWindowButton.addEventListener("click", () => {
    popupWindow.classList.toggle("window-hidden");
})
