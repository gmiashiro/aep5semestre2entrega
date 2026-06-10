const profileButton = document.querySelector(".profile-button");
const popupWindow = document.querySelector(".profile-window-container");
const exitWindowButton = document.querySelector(".exit-button");

exitWindowButton.addEventListener("click", () => {
    popupWindow.classList.toggle("window-hidden");
})

export function toggleProfileWindowLanding() {
    console.log("teste")
    const popupWindow = document.querySelector(".profile-window-container");
    popupWindow.classList.toggle("window-hidden");
}