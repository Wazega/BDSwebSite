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




// Actualise les donnée sauvegarder
function saveEvent() {
    // Récupérer l'option sélectionnée
    const selectedEvent = document.getElementById('eventSelect').value;
    // Sauvegarder dans le localStorage
    localStorage.setItem('selectedEvent', selectedEvent);
    alert('Option sauvegardée : ' + selectedEvent);
}