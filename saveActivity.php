<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/your/custom_error.log');
error_reporting(E_ALL);

// Vérification des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = './uploads/';
        $imageName = basename($_FILES['image']['name']);
        $uploadFilePath = $uploadDir . $imageName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFilePath)) {
            $titre = htmlspecialchars($_POST['titre']);
            $date = htmlspecialchars($_POST['date']);
            $description = htmlspecialchars($_POST['description']);

            // Charger les activités existantes
            $activities = [];
            if (file_exists('activities.json')) {
                $fileContent = file_get_contents('activities.json');
                if (!empty($fileContent)) {
                    $activities = json_decode($fileContent, true);
                    if (!is_array($activities)) {
                        $activities = [];
                    }
                }
            }

            // Générer un nouvel ID unique
            $newId = count($activities) > 0 ? max(array_column($activities, 'id')) + 1 : 1;

            $activityData = [
                'id' => $newId,
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'uploadFilePath' => $uploadFilePath
            ];

            $activities[] = $activityData;
            file_put_contents('activities.json', json_encode($activities, JSON_PRETTY_PRINT));

            header('Content-Type: application/json');
            echo json_encode($activityData);
        } else {
            error_log('Échec du déplacement du fichier téléchargé.');
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'upload de l\'image.']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Aucune image téléchargée ou erreur lors de l\'upload.']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
