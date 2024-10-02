document.getElementById('activity-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const sport = document.getElementById('sport').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (!date) {
        console.error('Date is required');
        return;
    }

    // Log data to check if it is correctly captured
    console.log({ sport, date, location, startTime, endTime });

    // Prepare activity object
    const activity = {
        sport,
        date,
        location,
        startTime,
        endTime
    };

    // Save to planning.json (using savePlanning.php)
    fetch('../03_php/savePlanning.php', {
        method: 'POST',
        body: JSON.stringify(activity),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Activity added successfully');
            // Reload the calendar to display the new activity
            loadActivities();
        } else {
            alert('Failed to add activity');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to load activities from planning.json
function loadActivities() {
    fetch('../03_php/loadPlanning.php')
        .then(response => response.json())
        .then(data => {
            const calendar = document.querySelector('.calendar .days');
            calendar.innerHTML = ''; // Clear the current calendar

            data.forEach(activity => {
                const dayElement = document.querySelector(`.day[data-date="${activity.date}"] .events`);
                if (dayElement) {
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event');
                    eventElement.innerHTML = `
                        <p class="title">${activity.sport}</p>
                        <p class="time">${activity.startTime} - ${activity.endTime}</p>
                        <p class="location">${activity.location}</p>
                        <button class="delete-btn" data-id="${activity.id}">Supprimer</button>
                    `;
                    dayElement.appendChild(eventElement);

                    // Add delete functionality
                    eventElement.querySelector('.delete-btn').addEventListener('click', function() {
                        deleteActivity(activity.id);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error loading activities:', error);
        });
}

// Function to delete an activity
function deleteActivity(id) {
    fetch('../03_php/deletePlanning.php', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Activity deleted successfully');
            loadActivities(); // Reload calendar after deletion
        } else {
            alert('Failed to delete activity');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Initial load of activities
document.addEventListener('DOMContentLoaded', loadActivities);

document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');
    console.log(dateElement); // Vérifiez ici s'il renvoie bien l'élément
});

window.onload = function() {
    const dateInput = document.getElementById("date");
    if (dateInput) {
        console.log(dateInput.value);  // Pour vérifier si la date est bien récupérée
    } else {
        console.error("L'élément avec l'ID 'date' est introuvable.");
    }
}

document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire classique

    // Récupérer les valeurs du formulaire
    const sport = document.getElementById("sport").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    // Valider et envoyer les données via AJAX (exemple)
    if (sport && date && location && startTime && endTime) {
        console.log("Données à envoyer :", { sport, date, location, startTime, endTime });
        // Envoyer les données à votre fichier PHP (savePlanning.php)
        // Vous pouvez utiliser fetch ou XMLHttpRequest pour cela
    } else {
        console.error("Tous les champs sont requis !");
    }
});