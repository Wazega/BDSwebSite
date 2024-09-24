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



function getDivHeight() {
    const div = document.getElementById('mountain');

    // Utilisez offsetHeight pour obtenir la hauteur du div en pixels
    const height = div.offsetHeight;

    // Afficher la hauteur dans la console
    console.log('Hauteur du Div:', height, 'px');

    return height;
}


window.onload = getDivHeight;

// Réécoutez les changements de taille de la fenêtre pour mettre à jour la hauteur
window.onresize = getDivHeight;



document.addEventListener('DOMContentLoaded', function() {
    const skierElement = document.querySelector('.skier');
    const skierInitialPosition = skierElement.getBoundingClientRect().top + window.scrollY;
    const windowHeight = window.innerHeight;
    var startScrollPosition;
    if (window.innerWidth <= 768) {
        startScrollPosition = skierInitialPosition - windowHeight * 0.5;
    } else {
        startScrollPosition = skierInitialPosition - windowHeight * 0.3;

    }

    const endScrollPosition = startScrollPosition + windowHeight/1.5;
    

    function onScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        console.log("Debut du pingouin", startScrollPosition);

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
        const jours = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60* 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `${jours}jours ${hours}h ${minutes}m ${seconds}s`;
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




document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navItems = document.getElementById('nav-items');

    menuToggle.addEventListener('click', function() {
        navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
    });
});






function getNextFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today.setDate(today.getDate() + daysUntilFriday));
    return nextFriday.toLocaleDateString();
}

document.getElementById('next-friday-date').innerText += getNextFriday();









