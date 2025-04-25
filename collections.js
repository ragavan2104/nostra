var menuicon = document.getElementById("menuicon");
var sidenav = document.getElementById("sidenav");

menuicon.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});

// Try to get promo and close elements, but don't throw an error if they don't exist
var promo = document.getElementById("promo");
var close = document.getElementById("close");
if (promo && close) {
    close.addEventListener("click", function() {
        promo.style.display = "none";
    });
}
