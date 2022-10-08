
const menuOpen = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

menuOpen.addEventListener("click", () => {
    if (overlay.classList.contains("overlay--active")) {
        overlay.classList.remove("overlay--active");
    } else {
        overlay.classList.add("overlay--active");
    }
    
});