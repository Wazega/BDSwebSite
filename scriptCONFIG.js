document.getElementById('activite-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = document.getElementById('activite-form');
    const formData = new FormData(form);

    fetch('saveActivity.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(text => {
        console.log("Réponse brute du serveur : ", text);

        try {
            const data = JSON.parse(text);
            console.log("Réponse JSON : ", data);

            if (data.success) {
                alert('Activité ajoutée avec succès !');
                chargerActivites(); // Charger les activités après l'ajout
            } else {
                alert('Erreur lors de l\'ajout de l\'activité : ' + data.message);
            }
        } catch (error) {
            console.error("Erreur lors du parsing JSON : ", error);
            alert('La réponse du serveur n\'est pas au format JSON.');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête :', error);
        alert('Erreur lors de l\'ajout de l\'activité.');
    });
});

// Fonction pour charger et afficher les activités
function chargerActivites() {
    fetch('getActivities.php')
        .then(response => response.json())
        .then(activites => {
            const activitySlider = document.getElementById('activity-item');
            activitySlider.innerHTML = ''; // Réinitialiser le contenu avant d'afficher les activités

            activites.forEach(activity => {
                ajouterActivite(activity.titre, activity.date, activity.description, activity.imagePath);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des activités :', error);
        });
}

// Fonction pour ajouter une activité à la liste
function ajouterActivite(titre, date, description, imagePath) {
    const activitySlider = document.getElementById('activity-item');

    const sliderDiv = document.createElement('div');
    sliderDiv.classList.add('activity-slider');

    const activiteDiv = document.createElement('div');
    activiteDiv.classList.add('activity-item');
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = titre;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('activity-info');
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = titre;

    const dateElement = document.createElement('span');
    dateElement.textContent = 'Date: ' + date;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(dateElement);
    infoDiv.appendChild(descriptionElement);
    
    activiteDiv.appendChild(img);
    activiteDiv.appendChild(infoDiv); // Ajouter le div des informations

    sliderDiv.appendChild(activiteDiv);
    activitySlider.appendChild(sliderDiv); // Ajouter le div slider à la liste d'activités
}

// Charger les activités lorsque la page est prête
document.addEventListener('DOMContentLoaded', function() {
    chargerActivites(); // Charger les activités à l'initialisation
});







// Ajouter des sports de couff
document.addEventListener('DOMContentLoaded', () => {
    const validCredentials = [
        { username: 'admin', password: 'config' },
        { username: 'gadubois', password: '#jesuisleboss' }
    ];

    function checkCredentials(username, password) {
        return validCredentials.some(cred => cred.username === username && cred.password === password);
    }

    document.getElementById('login-button').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (checkCredentials(username, password)) {
            document.getElementById('titre_config').classList.add('hidden');
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('LoginMiseEnPage').classList.add('hidden');

            const logos = document.querySelectorAll('.LogoBackground');
            logos.forEach(logo => logo.classList.add('hidden'));

            document.getElementById('content').classList.remove('hidden');
            document.getElementById('sport_icone').classList.remove('hidden');
            document.getElementById('wrapper_link').style.display = 'flex';
            document.getElementById('sport_icone').style.display = 'flex';
            document.getElementById('error-message').classList.add('hidden');
        } else {
            document.getElementById('error-message').textContent = "Mauvais identifiant/mot de passe.";
            document.getElementById('error-message').classList.remove('hidden');
        }
    });

    document.getElementById('toggle-password').addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        document.getElementById('toggle-password').textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Permettre la soumission par la touche Entrée
    document.getElementById('login-form').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Empêche le rechargement de la page
            document.getElementById('login-button').click();
        }
    });
});




// Sauvegarde les données
function saveEvent() {
    // Récupérer les valeurs des sélecteurs
    const sport1 = document.getElementById("sport1").value;
    const sport2 = document.getElementById("sport2").value;
    const sport3 = document.getElementById("sport3").value;
    const sport4 = document.getElementById("sport4").value;
    const sport5 = document.getElementById("sport5").value;

    // Afficher les valeurs dans la console pour vérifier
    console.log("Sport sélectionné pour sport1: ", sport1);
    console.log("Sport sélectionné pour sport2: ", sport2);
    console.log("Sport sélectionné pour sport3: ", sport3);
    console.log("Sport sélectionné pour sport4: ", sport4);
    console.log("Sport sélectionné pour sport5: ", sport5);

    // Préparez les données pour correspondre à la structure souhaitée
    const dataToSave = {
        sport1: sport1,
        sport2: sport2,
        sport3: sport3,
        sport4: sport4,
        sport5: sport5
    };

    // Envoyer les données au serveur
    fetch("/saveSelection.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("La sélection a été sauvegardée !");
        } else {
            alert("Erreur lors de la sauvegarde : " + data.message);
        }
    })
    .catch(error => {
        console.error("Erreur lors de la requête : ", error);
    });
}




window.onload = function() {
    fetch("/getSelection.php")
        .then(response => response.json())
        .then(data => {
            if (data.selections) {
                // Assurez-vous que les clés correspondent aux IDs des sélecteurs
                document.getElementById("sport1").value = data.selections.sport1 || "foot"; // valeur par défaut
                document.getElementById("sport2").value = data.selections.sport2 || "tenis"; // valeur par défaut
                document.getElementById("sport3").value = data.selections.sport3 || "tennis"; // valeur par défaut
                document.getElementById("sport4").value = data.selections.sport4 || "natation"; // valeur par défaut
                document.getElementById("sport5").value = data.selections.sport5 || "rugby"; // valeur par défaut
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des sélections : ", error);
        });
};

