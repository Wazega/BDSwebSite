document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    if (!document.body.classList.contains("page-unistra")) {

        // Ajoutez la classe scrolled immédiatement après le chargement de la page pour l'animation initiale
        setTimeout(() => navbar.classList.add("scrolled"), 1000);

        window.addEventListener("scroll", function() {
            if (window.scrollY > 900) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
    else{
        navbar.classList.add("scrolled");
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navItems = document.getElementById('nav-items');

    menuToggle.addEventListener('click', function() {
        navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
    });
});
