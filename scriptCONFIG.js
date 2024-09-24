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
    const sportItems = document.querySelectorAll('.sport-item'); // Récupère tous les éléments sport-item
    const selections = {}; // Un objet pour stocker les sélections

    // Itère sur chaque sport-item pour récupérer les valeurs
    sportItems.forEach((item, index) => {
        const sportName = item.querySelector('span').textContent.toLowerCase(); // Récupère le nom du sport en minuscule
        selections[`sport${index + 1}`] = sportName; // Ajoute le sport à l'objet avec la clé sport1, sport2, etc.
    });

    // Affiche les valeurs dans la console pour vérifier
    console.log("Sélections sauvegardées : ", selections);

    // Envoyer les données au serveur
    fetch("/saveSelection.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selections), // Envoie l'objet des sélections
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
                document.getElementById("sport2").value = data.selections.sport2 || "basket"; // valeur par défaut
                document.getElementById("sport3").value = data.selections.sport3 || "tennis"; // valeur par défaut
                document.getElementById("sport4").value = data.selections.sport4 || "natation"; // valeur par défaut
                document.getElementById("sport5").value = data.selections.sport5 || "rugby"; // valeur par défaut
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des sélections : ", error);
        });
};

