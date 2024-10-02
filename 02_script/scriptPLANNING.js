const eventForm = document.getElementById("event-form");
const messageElement = document.getElementById("message");
const daysContainer = document.querySelector(".days");

const loadPlanning = async () => {
    const response = await fetch("../03_php/loadPlanning.php");
    const events = await response.json();
    displayCalendar(events);
};

const displayCalendar = (events) => {
    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // First Monday
    const daysInWeek = 5; // Monday to Friday
    daysContainer.innerHTML = ""; // Clear previous entries

    for (let week = 0; week < 2; week++) { // 2 weeks
        for (let day = 0; day < daysInWeek; day++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(currentDay.getDate() + week * 7 + day);

            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.innerHTML = `
                <div class="date">
                    <p class="date-num">${currentDay.getDate()}</p>
                    <p class="date-day">${currentDay.toLocaleString('en-US', { weekday: 'short' })}</p>
                </div>
                <div class="events"></div>
            `;

            const eventsDiv = dayDiv.querySelector(".events");

            const dayEvents = events.filter(event => new Date(event.date).toDateString() === currentDay.toDateString());
            if (dayEvents.length === 0) {
                eventsDiv.innerHTML = '<p class="no-event">Pas de match aujourd\'hui</p>';
            } else {
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    const startHour = new Date(event.date + ' ' + event.startTime);
                    const endHour = new Date(event.date + ' ' + event.endTime);

                    eventDiv.style.gridRowStart = Math.max(2, startHour.getHours() - 16); // 17h = row 2
                    eventDiv.style.gridRowEnd = Math.min(8, endHour.getHours() - 16); // 23h = row 8

                    eventDiv.innerHTML = `
                        <p class="title">${event.sport} à ${event.location}</p>
                        <p class="time">${event.startTime} - ${event.endTime}</p>
                        <button class="delete-event" data-id="${event.id}">Supprimer</button>
                    `;

                    eventsDiv.appendChild(eventDiv);
                });
            }
            daysContainer.appendChild(dayDiv);
        }
    }

    const deleteButtons = document.querySelectorAll(".delete-event");
    deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            await fetch(`../03_php/savePlanning.php?id=${id}`, { method: 'DELETE' });
            loadPlanning();
            showMessage("Événement supprimé");
        });
    });
};

const showMessage = (msg) => {
    messageElement.innerText = msg;
    setTimeout(() => {
        messageElement.innerText = '';
    }, 3000);
};

eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sport = document.getElementById("sport").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    console.log(date);
    const response = await fetch("../03_php/savePlanning.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sport, date, location, startTime, endTime })
    });

    if (response.ok) {
        showMessage("Événement ajouté avec succès !");
        loadPlanning();
        eventForm.reset();
    } else {
        showMessage("Erreur lors de l'ajout de l'événement.");
    }
});

// Load initial events
loadPlanning();
