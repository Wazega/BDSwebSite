document.getElementById('addActivityButton').addEventListener('click', function() {
    addActivityToCalendar();
});

function addActivityToCalendar() {
    const sport = document.getElementById('sportSelect').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const location = document.getElementById('locationSelect').value;

    if (sport && startTime && endTime && location) {
        // Création de l'élément activité
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `<p class="title">${sport}</p><p class="time">${startTime} - ${endTime}</p><p class="location">${location}</p>`;

        // Ajout de l'activité à la première journée du calendrier
        document.querySelector('.days').appendChild(eventElement);

        // Sauvegarder dans le fichier JSON
        const activityData = {
            sport: sport,
            startTime: startTime,
            endTime: endTime,
            location: location
        };
        saveActivityToServer(activityData);

        // Afficher un message de succès
        console.log('Activité ajoutée au calendrier.');
    } else {
        console.log('Veuillez remplir tous les champs.');
    }
}

function saveActivityToServer(activityData) {
    fetch('03_php/savePlanning.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données sauvegardées:', data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}
