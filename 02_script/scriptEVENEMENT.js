document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour charger les sélections
    function loadSelections() {
        fetch('selections.json')
            .then(response => response.json())
            .then(data => {
                const sportItems = document.querySelectorAll('.sport-item'); // Récupère tous les éléments sport-item

                // Mettez à jour chaque élément sport-item avec les données du JSON
                sportItems.forEach((item, index) => {
                    const sportKey = `sport${index + 1}`; // sport1, sport2, etc.
                    const sportName = data[sportKey]; // Récupère le nom du sport

                    if (sportName) {
                        console.log(sportName);
                        const sportImage = `04_Image/icone_${sportName}.png`; // Chemin de l'image

                        // Met à jour le texte et l'image
                        item.querySelector('span').textContent = sportName.charAt(0).toUpperCase() + sportName.slice(1); // Met en majuscule la première lettre
                        item.querySelector('img').src = sportImage; // Change l'image
                        item.querySelector('img').alt = sportName; // Met à jour l'attribut alt
                    }
                });
            })
            .catch(error => {
                console.error("Erreur lors du chargement des sélections : ", error);
            });
    }

    // Appelle la fonction pour charger les sélections
    loadSelections();
});
