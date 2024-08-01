document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");

    // Ajoutez la classe scrolled immédiatement après le chargement de la page pour l'animation initiale
    setTimeout(() => navbar.classList.add("scrolled"), 1000);

    window.addEventListener("scroll", function() {
        if (window.scrollY > 900) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});


function logWindowSizeAndScroll() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    console.log(`Largeur: ${width}px, Hauteur: ${height}px, ScrollX: ${scrollX}px, ScrollY: ${scrollY}px`);
}

// Call the function to log the window size and scroll position initially
logWindowSizeAndScroll();

// Add event listeners to log the window size and scroll position when the window is resized or scrolled
window.addEventListener('resize', logWindowSizeAndScroll);
window.addEventListener('scroll', logWindowSizeAndScroll);






document.addEventListener('DOMContentLoaded', function() {
    let windowHeight = window.innerHeight;
    const skier = document.getElementById('skier');
    const mountainContainer = document.querySelector('.mountain-container');
    const overlayText = document.querySelector('.overlay-text');

    // Fonction pour ajuster la position du skieur et la taille du texte en fonction du défilement
    function onScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const startScroll = 2.70 * windowHeight; // Modifier pour définir le point de départ du défilement
        const endScroll = 4.13 * windowHeight; // Modifier pour définir le point de fin du défilement
        const maxSkierHeight = mountainContainer.offsetHeight - skier.offsetHeight; // Limite maximale pour le skieur

        // Ajuster la position du skieur
        if (scrollTop >= startScroll && scrollTop <= endScroll) {
            const scrollRange = endScroll - startScroll;
            const skierPosition = (scrollTop - startScroll) / scrollRange * maxSkierHeight;
            skier.style.top = `${Math.min(skierPosition, maxSkierHeight)}px`;
        } else if (scrollTop < startScroll) {
            skier.style.top = '0px';
        } else if (scrollTop > endScroll) {
            skier.style.top = `${maxSkierHeight}px`;
        }

        // Ajuster la taille du texte
        const textSizeStart = 2500; // Point de défilement où le texte commence à grandir
        const textSizeEnd = 3400; // Point de défilement où le texte atteint sa taille maximale
        const maxTextSize = 19; // Taille maximale du texte en em

        if (scrollTop >= textSizeStart && scrollTop <= textSizeEnd) {
            const textScrollRange = textSizeEnd - textSizeStart;
            const textSize = 2 + ((scrollTop - textSizeStart) / textScrollRange) * (maxTextSize - 2);
            overlayText.style.fontSize = `${textSize}em`;
        } else if (scrollTop < textSizeStart) {
            overlayText.style.fontSize = '2em';
        } else if (scrollTop > textSizeEnd) {
            overlayText.style.fontSize = `${maxTextSize}em`;
        }
    }

    // Fonction pour mettre à jour le compteur
    function updateTimer() {
        const endDate = new Date('2024-12-23T00:00:00');
        const now = new Date();
        const timeRemaining = endDate - now;

        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    // Mettre à jour le compteur toutes les secondes
    setInterval(updateTimer, 1000);
    updateTimer();

    // Écouter l'événement de défilement
    window.addEventListener('scroll', onScroll);

    // Écouter l'événement de redimensionnement
    window.addEventListener('resize', function() {
        windowHeight = window.innerHeight;
        onScroll(); // Mettre à jour les positions et tailles après le redimensionnement
    });

    // Appeler la fonction au chargement initial pour appliquer le style
    onScroll();
});






