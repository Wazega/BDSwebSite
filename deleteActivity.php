<?php
// Activer le rapport d'erreurs pour déboguer
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Vérification que la méthode est bien POST et que l'ID est fourni
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']); // Récupérer l'ID de l'activité

    // Lire les activités existantes
    $activities = [];
    if (file_exists('activities.json')) {
        $activities = json_decode(file_get_contents('activities.json'), true);
    }

    // Rechercher l'activité avec l'ID correspondant
    $activityIndex = -1;
    foreach ($activities as $index => $activity) {
        if ($activity['id'] == $id) {
            $activityIndex = $index;
            break;
        }
    }

    if ($activityIndex !== -1) {
        // Supprimer l'activité
        array_splice($activities, $activityIndex, 1);

        // Sauvegarder les modifications dans le fichier JSON
        file_put_contents('activities.json', json_encode($activities, JSON_PRETTY_PRINT));

        // Réponse en cas de succès
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Activité supprimée avec succès.'
        ]);
    } else {
        // Si l'activité n'a pas été trouvée
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Activité non trouvée.'
        ]);
    }
} else {
    // Si la méthode est incorrecte ou que l'ID n'est pas fourni
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'ID d\'activité non fourni ou méthode non autorisée.'
    ]);
}
?>
