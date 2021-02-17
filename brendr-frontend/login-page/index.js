const mobileHam = document.querySelector(".mobile-hamburger");
const mobileClose = document.querySelector(".mobile-close");
const mobileNav = document.querySelector(".mobile-nav");

mobileHam.addEventListener("click", (e) => {
    mobileNav.classList.add("active");
})

mobileClose.addEventListener("click", (e) => {
    mobileNav.classList.remove("active");
})