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


//Partie pour le timer

function calculateDaysRemaining(targetDate) {
    const currentDate = new Date();
    const eventDate = new Date(targetDate);
    const timeDiff = eventDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining;
}


// DATE A MODIFIER POUR LE WES
const targetDate = '2024-12-31';


function updateDaysTimer() {
    const daysRemaining = calculateDaysRemaining(targetDate);
    document.getElementById('days-timer').innerText = daysRemaining;
}

window.onload = updateDaysTimer;

setInterval(updateDaysTimer, 24 * 60 * 60 * 1000);



// Partie pour modifier le défilement des évènements

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.Actu-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    const items = [];

    // Fonction pour charger les images depuis une autre page
    function loadImages() {
        fetch('actu.html') // Remplace par l'URL de ta page source
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const images = doc.querySelectorAll('.image-class'); // Remplace '.image-class' par la classe des images
                images.forEach(img => {
                    const newItem = document.createElement('div');
                    newItem.classList.add('carousel-item');
                    newItem.innerHTML = img.outerHTML;
                    container.appendChild(newItem);
                    items.push(newItem);
                });
                updateCarousel(); // Met à jour la position initiale
            })
            .catch(error => {
                console.error('Erreur de chargement des images:', error);
            });
    }

    // Fonction pour mettre à jour le défilement
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Événement pour le clic sur la flèche gauche
    leftArrow.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = items.length - 1; // Passe à la dernière image
        } else {
            currentIndex--;
        }
        updateCarousel();
    });

    // Événement pour le clic sur la flèche droite
    rightArrow.addEventListener('click', () => {
        if (currentIndex === items.length - 1) {
            currentIndex = 0; // Reprend depuis la première image
        } else {
            currentIndex++;
        }
        updateCarousel();
    });

    loadImages(); // Charge les images au démarrage
});









document.addEventListener('DOMContentLoaded', function() {
    const skier = document.getElementById('skier');
    const mountainContainer = document.querySelector('.mountain-container');
    const overlayText = document.querySelector('.overlay-text');

    // Réglage des points de défilement
    const startScroll = 2900; // Modifier pour définir le point de départ du défilement
    const endScroll = 3800; // Modifier pour définir le point de fin du défilement
    const maxSkierHeight = mountainContainer.offsetHeight - 210; // Limite maximale pour le skieur (ajustée)

    // Fonction pour ajuster la position du skieur et la taille du texte en fonction du défilement
    function onScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // Ajuster la position du skieur
        if (scrollTop >= startScroll && scrollTop <= endScroll) {
            const scrollRange = endScroll - startScroll;
            const skierPosition = (scrollTop - startScroll) / scrollRange * (maxSkierHeight - skier.offsetHeight);
            skier.style.top = `${Math.min(skierPosition, maxSkierHeight)}px`;
        } else if (scrollTop < startScroll) {
            skier.style.top = '0px';
        } else if (scrollTop > endScroll) {
            skier.style.top = `${maxSkierHeight}px`;
        }

        // Ajuster la taille du texte
        const textSizeStart = 2700; // Point de défilement où le texte commence à grandir
        const textSizeEnd = 3400; // Point de défilement où le texte atteint sa taille maximale
        const maxTextSize = 19; // Taille maximale du texte en em (ajustée)

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

    // Écouter l'événement de défilement
    window.addEventListener('scroll', onScroll);

    // Appeler la fonction au chargement initial pour appliquer le style
    onScroll();

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
});





