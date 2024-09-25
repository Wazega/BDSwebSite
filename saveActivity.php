<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérification des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérification de l'upload de l'image
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = './uploads/'; // Dossier de destination
        $imageName = basename($_FILES['image']['name']); // Nom du fichier
        $uploadFilePath = $uploadDir . $imageName;

        // Si l'image existe déjà dans uploads, vous pouvez simplement utiliser son chemin
        if (file_exists($uploadFilePath)) {
            // Récupération des autres données du formulaire
            $titre = htmlspecialchars($_POST['titre']);
            $date = htmlspecialchars($_POST['date']);
            $description = htmlspecialchars($_POST['description']);

            // Ajouter l'activité au fichier JSON
            $activities = [];

            // Lire les activités existantes
            if (file_exists('activities.json')) {
                $activities = json_decode(file_get_contents('activities.json'), true);
            }

            // Créer une nouvelle activité
            $newActivity = [
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'imagePath' => $uploadFilePath
            ];

            // Ajouter la nouvelle activité au tableau
            $activities[] = $newActivity;

            // Écrire les nouvelles activités dans le fichier
            file_put_contents('activities.json', json_encode($activities, JSON_PRETTY_PRINT));

            // Réponse JSON
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Activité ajoutée avec succès !',
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'imagePath' => $uploadFilePath
            ]);
        } else {
            // Erreur lors de l'upload de l'image
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de l\'upload de l\'image.'
            ]);
        }
    } else {
        // Erreur : aucune image ou problème lors de l'upload
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Aucune image téléchargée ou erreur lors de l\'upload.'
        ]);
    }
} else {
    // Requête non valide
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée.'
    ]);
}
?>
