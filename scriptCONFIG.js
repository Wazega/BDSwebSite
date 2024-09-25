// Traitement des activités
document.getElementById('activite-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const formData = new FormData();
    formData.append('titre', document.getElementById('titre').value);
    formData.append('date', document.getElementById('date').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image-upload').files[0]);

    fetch('/saveActivity.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Activité ajoutée avec succès !');
            displayActivity(data.activity);  // Affiche l'activité sur la page
        } else {
            alert('Erreur lors de l\'ajout de l\'activité : ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête : ', error);
    });
});

// Fonction pour afficher une nouvelle activité sur la page
function displayActivity(activity) {
    const activityList = document.getElementById('activite-list');

    const activityItem = `
    <div class="activity-item">
        <img src="${activity.imagePath}" alt="${activity.titre}">
        <div class="activity-info">
            <h2>${activity.titre}</h2>
            <span>Date: ${activity.date}</span>
            <p>${activity.description}</p>
        </div>
        <button onclick="deleteActivity(${activity.id})">Supprimer</button>
    </div>
    `;

    activityList.innerHTML += activityItem; // Ajoute l'activité au DOM
}

// Fonction pour supprimer une activité
function deleteActivity(activityId) {
    fetch(`/deleteActivity.php?id=${activityId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Activité supprimée avec succès !');
            location.reload();  // Recharge la page pour actualiser la liste
        } else {
            alert('Erreur lors de la suppression : ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la suppression : ', error);
    });
}


window.onload = function() {
    fetch('/getActivities.php')
    .then(response => response.json())
    .then(activities => {
        activities.forEach(activity => {
            displayActivity(activity);  // Affiche chaque activité
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des activités : ', error);
    });
};






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

