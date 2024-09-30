// Charger les activités lorsque la page est prête
document.addEventListener('DOMContentLoaded', function() {
    chargerActivites(); // Charger les activités à l'initialisation
});

// Fonction pour charger et afficher les activités depuis activities.json
function chargerActivites() {
    fetch('../getActivities.php')
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

                // Créer et ajouter le bouton de suppression
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', function() {
                    supprimerActivite(activity.id);
                });

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