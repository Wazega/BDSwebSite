document.addEventListener('DOMContentLoaded', function () {
    loadSchedule();
    const form = document.getElementById('addEventForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        addEventToSchedule();
    });
});

function loadSchedule() {
    fetch('03_php/loadPlanning.php')
        .then(response => response.json())
        .then(data => {
            const daysContainer = document.getElementById('days-container');
            daysContainer.innerHTML = ''; // Clear previous content
            data.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');

                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date');
                const dateNum = document.createElement('p');
                dateNum.classList.add('date-num');
                dateNum.textContent = day.dateNum;

                const dateDay = document.createElement('p');
                dateDay.classList.add('date-day');
                dateDay.textContent = day.dateDay;

                dateDiv.appendChild(dateNum);
                dateDiv.appendChild(dateDay);
                dayDiv.appendChild(dateDiv);

                const eventsDiv = document.createElement('div');
                eventsDiv.classList.add('events');
                day.events.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event', event.sport.toLowerCase());

                    const title = document.createElement('p');
                    title.classList.add('title');
                    title.textContent = event.sport;

                    const time = document.createElement('p');
                    time.textContent = `${event.startTime} - ${event.endTime}`;

                    eventDiv.appendChild(title);
                    eventDiv.appendChild(time);
                    eventsDiv.appendChild(eventDiv);
                });

                dayDiv.appendChild(eventsDiv);
                daysContainer.appendChild(dayDiv);
            });
        })
        .catch(error => console.error('Erreur de chargement du planning:', error));
}

function addEventToSchedule() {
    const sport = document.getElementById('sport').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    fetch('03_php/savePlanning.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sport, startTime, endTime, location, date })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('successMessage').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'none';
                }, 2000);
                loadSchedule(); // Refresh the schedule
            } else {
                console.error('Erreur lors de l\'ajout:', data.error);
            }
        })
        .catch(error => console.error('Erreur de sauvegarde du planning:', error));
}
