<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'path/to/your/custom_error.log'); // Remplacez par le chemin valide
error_reporting(E_ALL);

// Vérification des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérification de l'upload de l'image
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = './uploads/'; // Dossier de destination
        $imageName = basename($_FILES['image']['name']); // Nom du fichier
        $uploadFilePath = $uploadDir . $imageName;

        // Debug - Vérifier si le fichier temporaire existe
        if (!file_exists($_FILES['image']['tmp_name'])) {
            error_log('Le fichier temporaire n\'existe pas.');
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Le fichier temporaire n\'existe pas.']);
            exit;
        }

        // Déplacement du fichier téléchargé
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFilePath)) {
            // Récupération des autres données du formulaire
            $titre = htmlspecialchars($_POST['titre']);
            $date = htmlspecialchars($_POST['date']);
            $description = htmlspecialchars($_POST['description']);

            // Enregistrement dans activities.json
            $activityData = [
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'imagePath' => $uploadFilePath
            ];

            // Lire les activités existantes
            $activities = [];
            if (file_exists('activities.json')) {
                $activities = json_decode(file_get_contents('activities.json'), true);
            }

            // Ajouter la nouvelle activité
            $activities[] = $activityData;

            // Écrire les données dans activities.json
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
            // Log de l'erreur
            error_log('Échec du déplacement du fichier téléchargé.');
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'upload de l\'image.']);
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
