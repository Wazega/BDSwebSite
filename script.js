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
    const skierElement = document.querySelector('.skier');
    const skierInitialPosition = skierElement.getBoundingClientRect().top + window.scrollY;
    const windowHeight = window.innerHeight;
    const startScrollPosition = skierInitialPosition - windowHeight * 0.3; // 30% du haut de la fenêtre
    const endScrollPosition = startScrollPosition + windowHeight;

    function onScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop >= startScrollPosition && scrollTop <= endScrollPosition) {
            const progress = (scrollTop - startScrollPosition) / (endScrollPosition - startScrollPosition);
            const skierMaxTop = document.querySelector('.mountain-container').offsetHeight - skierElement.offsetHeight;
            const skierNewTop = Math.min(progress * skierMaxTop, skierMaxTop);
            skierElement.style.top = `${skierNewTop}px`;
            
            // Ajuster la taille du texte
            const overlayText = document.querySelector('.overlay-text');
            const maxTextSize = 19; // Taille maximale du texte en vw
            const textSize = 2 + progress * (maxTextSize - 2);
            overlayText.style.fontSize = `${textSize}vw`;
        } else if (scrollTop < startScrollPosition) {
            skierElement.style.top = '0px';
        } else if (scrollTop > endScrollPosition) {
            skierElement.style.top = `${document.querySelector('.mountain-container').offsetHeight - skierElement.offsetHeight}px`;
        }
    }

    function updateTimer() {
        const endDate = new Date('2024-12-23T00:00:00');
        const now = new Date();
        const timeRemaining = endDate - now;

        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', function() {
        let windowHeight = window.innerHeight;
        onScroll();
    });

    onScroll();
});








