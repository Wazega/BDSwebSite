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

