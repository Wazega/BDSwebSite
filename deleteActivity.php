<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'path/to/your/custom_error.log');
error_reporting(E_ALL);

// Vérification de la méthode POST, de l'ID de l'activité et de l'action de suppression
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id']) && isset($_POST['action']) && $_POST['action'] === 'delete') {
    $id = intval($_POST['id']); // Récupérer l'ID depuis les données POST

    // Lire les activités existantes
    $activities = [];
    if (file_exists('activities.json')) {
        $activities = json_decode(file_get_contents('activities.json'), true);
    }

    // Trouver l'activité à supprimer
    $activityIndex = -1;
    $imagePath = '';
    foreach ($activities as $index => $activity) {
        if ($activity['id'] === $id) {
            $activityIndex = $index;
            $imagePath = $activity['imagePath']; // Récupérer le chemin de l'image associée
            break;
        }
    }

    if ($activityIndex !== -1) {
        // Supprimer l'activité du tableau
        array_splice($activities, $activityIndex, 1);

        // Réécrire le fichier activities.json sans l'activité supprimée
        file_put_contents('activities.json', json_encode($activities, JSON_PRETTY_PRINT));

        // Supprimer l'image associée
        if (file_exists($imagePath)) {
            unlink($imagePath); // Supprimer le fichier image
        }

        // Réponse JSON
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Activité supprimée avec succès.'
        ]);
    } else {
        // Activité non trouvée
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Activité non trouvée.'
        ]);
    }
} else {
    // ID non fourni ou mauvaise méthode
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'ID d\'activité non fourni ou méthode non autorisée.'
    ]);
}
?>
