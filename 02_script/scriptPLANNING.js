document.addEventListener('DOMContentLoaded', function () {
    // On récupère le bouton et l'élément de formulaire
    const form = document.querySelector('form');
    const planningContainer = document.querySelector('.days');
    
    // Charger les activités existantes depuis planning.json
    loadPlanning();

    // Fonction pour ajouter une activité dans le fichier planning.json
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche la page de se recharger

        const sport = document.getElementById('sport').value;
        const date = document.getElementById('date').value;
        const lieu = document.getElementById('lieu').value;
        const heureDebut = document.getElementById('heureDebut').value;
        const heureFin = document.getElementById('heureFin').value;

        if (!sport || !date || !lieu || !heureDebut || !heureFin) {
            alert('Tous les champs doivent être remplis.');
            return;
        }

        // Ajouter l'activité à planning.json via PHP
        const formData = new FormData();
        formData.append('sport', sport);
        formData.append('date', date);
        formData.append('lieu', lieu);
        formData.append('heureDebut', heureDebut);
        formData.append('heureFin', heureFin);

        fetch('../03_php/savePlanning.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Activité ajoutée avec succès !');
                addActivityToCalendar(sport, date, lieu, heureDebut, heureFin); // Ajouter directement dans le planning sans recharger la page
            } else {
                alert('Erreur lors de l\'ajout de l\'activité.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });

    // Fonction pour charger le planning
    function loadPlanning() {
        fetch('../03_php/loadPlanning.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(activity => {
                    addActivityToCalendar(
                        activity.sport,
                        activity.date,
                        activity.lieu,
                        activity.heureDebut,
                        activity.heureFin
                    );
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement du planning:', error);
            });
    }

    // Fonction pour ajouter une activité visuellement dans le planning
    function addActivityToCalendar(sport, date, lieu, heureDebut, heureFin) {
        const dayElement = document.querySelector(`.day[data-date="${date}"]`);
        if (dayElement) {
            const eventsContainer = dayElement.querySelector('.events');
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.innerHTML = `
                <p class="title">${sport} - ${lieu}</p>
                <p class="time">${heureDebut} - ${heureFin}</p>
                <button class="delete-btn">Supprimer</button>
            `;

            eventsContainer.appendChild(eventElement);

            // Ajouter la fonctionnalité de suppression
            eventElement.querySelector('.delete-btn').addEventListener('click', function () {
                deleteActivityFromCalendar(eventElement, date, heureDebut, heureFin);
            });
        } else {
            console.warn(`Aucun élément trouvé pour la date : ${date}`);
        }
    }

    // Fonction pour supprimer une activité
    function deleteActivityFromCalendar(eventElement, date, heureDebut, heureFin) {
        eventElement.remove(); // Supprimer visuellement l'élément

        // Envoyer une requête pour supprimer l'activité du fichier planning.json
        const formData = new FormData();
        formData.append('date', date);
        formData.append('heureDebut', heureDebut);
        formData.append('heureFin', heureFin);

        fetch('../03_php/deletePlanning.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Activité supprimée avec succès !');
            } else {
                alert('Erreur lors de la suppression de l\'activité.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }
});
