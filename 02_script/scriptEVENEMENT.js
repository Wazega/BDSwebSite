document.addEventListener('DOMContentLoaded', function () {
    const activitySlider = document.getElementById('activity-slider');

    // Charger les activités à partir du fichier JSON
    fetch('activities.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier JSON.');
            }
            return response.json();
        })
        .then(activities => {
            // Parcourir chaque activité et l'ajouter à la page
            activities.forEach(activity => {
                const activityDiv = document.createElement('div');
                activityDiv.classList.add('activity-item');

                const img = document.createElement('img');
                img.src = activity.imagePath;
                img.alt = activity.titre;

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('activity-info');

                const titleElement = document.createElement('h2');
                titleElement.textContent = activity.titre;

                const dateElement = document.createElement('span');
                dateElement.textContent = 'Date: ' + activity.date;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = activity.description;

                // Append info to activity div
                infoDiv.appendChild(titleElement);
                infoDiv.appendChild(dateElement);
                infoDiv.appendChild(descriptionElement);

                activityDiv.appendChild(img);
                activityDiv.appendChild(infoDiv);

                // Ajouter le div d'activité au slider
                activitySlider.appendChild(activityDiv);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});





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
                    console.log(sportName);
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

