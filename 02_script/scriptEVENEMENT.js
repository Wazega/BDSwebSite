document.addEventListener('DOMContentLoaded', function() {
    chargerActivites(); // Charger les activités à l'initialisation
});

// Fonction pour charger et afficher les activités depuis activities.json
function chargerActivites() {
    fetch('getActivities.php')
        .then(response => response.json())
        .then(activites => {
            const activitySlider = document.getElementById('activity-slider');
            activitySlider.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouvelles activités

            activites.forEach((activity) => {
                // Créer un élément div pour chaque activité
                const activiteDiv = document.createElement('div');
                activiteDiv.classList.add('activity-item');

                // Créer et ajouter l'image
                const img = document.createElement('img');
                img.src = activity.imagePath;
                img.alt = activity.titre;

                // Créer un div pour les informations de l'activité
                const infoDiv = document.createElement('div');
                infoDiv.classList.add('activity-info');

                // Créer et ajouter le titre
                const titleElement = document.createElement('h2');
                titleElement.textContent = activity.titre;

                // Créer et ajouter la date
                const dateElement = document.createElement('span');
                dateElement.textContent = 'Date: ' + activity.date;

                // Créer et ajouter la description
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = activity.description;

                // Ajouter les informations à infoDiv
                infoDiv.appendChild(titleElement);
                infoDiv.appendChild(dateElement);
                infoDiv.appendChild(descriptionElement);

                // Ajouter les éléments à l'élément activité
                activiteDiv.appendChild(img);
                activiteDiv.appendChild(infoDiv);
                activiteDiv.appendChild(deleteButton);

                // Ajouter l'élément d'activité à activitySlider
                activitySlider.appendChild(activiteDiv);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des activités :', error);
        });
}





// Pour afficher les sports de couff
document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour charger les sélections
    function loadSelections() {
        fetch('selections.json')
            .then(response => response.json())
            .then(data => {
                const sportItems = document.querySelectorAll('.sport-item'); // Récupère tous les éléments sport-item

                // Mettez à jour chaque élément sport-item avec les données du JSON
                sportItems.forEach((item, index) => {
                    const sportKey = `sport${index + 1}`; // sport1, sport2, etc.
                    const sportName = data[sportKey]; // Récupère le nom du sport
                    
                    
                    if (sportName) {
                        console.log(sportName);
                        const sportImage = `04_Image/icone_${sportName}.png`; // Chemin de l'image

                        // Met à jour le texte et l'image
                        item.querySelector('span').textContent = sportName.charAt(0).toUpperCase() + sportName.slice(1); // Met en majuscule la première lettre
                        item.querySelector('img').src = sportImage; // Change l'image
                        item.querySelector('img').alt = sportName; // Met à jour l'attribut alt
                    }
                });
            })
            .catch(error => {
                console.error("Erreur lors du chargement des sélections : ", error);
            });
    }

    // Appelle la fonction pour charger les sélections
    loadSelections();
});

// Pour afficher la date
function getNextFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today.setDate(today.getDate() + daysUntilFriday));

    // Formater la date en jour et mois uniquement
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(nextFriday);

    // Ajouter un espace avant la date
    const result = ` ${formattedDate}`;

    console.log(result);
    return result;
}

document.getElementById('next-friday-date').innerText += getNextFriday();

