document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les événements depuis le serveur
    chargerPlanning();

    const daysContainer = document.getElementById('days');
    const currentDate = new Date();
    let currentMonday = getMonday(currentDate);

    function getMonday(date) {
        let day = date.getDay() || 7;
        if (day !== 1) {
            date.setHours(-24 * (day - 1));
        }
        return date;
    }

    // Générer deux semaines du lundi au vendredi
    for (let week = 0; week < 2; week++) {
        for (let i = 0; i < 5; i++) {  // Seulement lundi à vendredi
            const day = document.createElement('div');
            day.classList.add('day');
            day.dataset.date = currentMonday.toISOString().split('T')[0];
            day.innerHTML = `
                <div class="date">
                    <p class="date-day">${currentMonday.toLocaleDateString('fr-FR', { weekday: 'long' })}</p>
                    <p class="date-num">${currentMonday.getDate()}</p>
                </div>
                <div class="events"></div>
            `;
            daysContainer.appendChild(day);
            currentMonday.setDate(currentMonday.getDate() + 1);
        }
        currentMonday.setDate(currentMonday.getDate() + 2); // Passer au lundi suivant (ignorer samedi et dimanche)
    }

    // Ajouter un événement
    document.getElementById('add-event').addEventListener('click', function() {
        const date = document.getElementById('date').value;
        const sport = document.getElementById('sport').value;
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const location = document.getElementById('location').value;

        const event = {
            date: date,
            sport: sport,
            start: start,
            end: end,
            location: location
        };

        // Envoyer les données au serveur pour les enregistrer
        fetch('03_php/savePlanning.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  ajouterEvenement(event);
              } else {
                  alert('Erreur lors de l\'ajout de l\'événement');
              }
          });
    });

    function ajouterEvenement(event) {
        const day = document.querySelector(`[data-date="${event.date}"] .events`);
        if (day) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerHTML = `
                <p class="title">${event.sport}</p>
                <p class="time">${event.start} - ${event.end} (${event.location})</p>
            `;
            day.appendChild(eventDiv);
        }
    }

    function chargerPlanning() {
        fetch('03_php/loadPlanning.php')
            .then(response => response.json())
            .then(events => {
                events.forEach(ajouterEvenement);
            });
    }
});
