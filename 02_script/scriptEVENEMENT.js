document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour charger les sélections
    function loadSelections() {
        fetch('selections.json')
            .then(response => response.json())
            .then(data => {
                const sports = data.sports; // Récupère la liste des sports
                const sportItems = document.querySelectorAll('.sport-item'); // Récupère tous les éléments sport-item

                // Assurez-vous que le nombre de sports correspond à celui des éléments sport-item
                if (sports.length <= sportItems.length) {
                    sportItems.forEach((item, index) => {
                        if (sports[index]) {
                            const sportName = sports[index];
                            const sportImage = `Image/icone_${sportName}.png`; // Chemin de l'image

                            // Met à jour le texte et l'image
                            item.querySelector('span').textContent = sportName.charAt(0).toUpperCase() + sportName.slice(1); // Met en majuscule la première lettre
                            item.querySelector('img').src = sportImage; // Change l'image
                            item.querySelector('img').alt = sportName; // Met à jour l'attribut alt
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Erreur lors du chargement des sélections : ", error);
            });
    }

    // Appelle la fonction pour charger les sélections
    loadSelections();
});
