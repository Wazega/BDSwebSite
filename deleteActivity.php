<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Vérification de la méthode POST et de l'ID de l'activité
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']); // Récupérer l'ID de l'activité à partir du POST

    // Lire les activités existantes
    $activities = [];
    if (file_exists('activities.json')) {
        $activities = json_decode(file_get_contents('activities.json'), true);
    }

    // Rechercher l'activité par son ID
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

        // Réécrire le fichier JSON après suppression
        file_put_contents('activities.json', json_encode($activities, JSON_PRETTY_PRINT));

        // Supprimer l'image associée si elle existe
        if (file_exists($imagePath)) {
            unlink($imagePath); // Supprimer l'image
        }

        // Réponse JSON de succès
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Activité supprimée avec succès.'
        ]);
    } else {
        // Si l'activité n'est pas trouvée
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Activité non trouvée.'
        ]);
    }
} else {
    // Si l'ID n'est pas fourni ou si la méthode est incorrecte
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'ID d\'activité non fourni ou méthode non autorisée.'
    ]);
}
?>
