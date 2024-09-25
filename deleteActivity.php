<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Récupérer l'ID de l'activité à supprimer
    $activityId = $_GET['id'];

    // Charger les activités existantes depuis le fichier JSON
    $activities = json_decode(file_get_contents('activities.json'), true);

    // Trouver et supprimer l'activité correspondante
    $activityFound = false;
    foreach ($activities as $index => $activity) {
        if ($activity['id'] == $activityId) {
            // Supprimer le fichier image associé
            if (file_exists($activity['imagePath'])) {
                unlink($activity['imagePath']);
            }

            // Supprimer l'activité du tableau
            unset($activities[$index]);
            $activityFound = true;
            break;
        }
    }

    if ($activityFound) {
        // Réindexer le tableau après suppression
        $activities = array_values($activities);

        // Sauvegarder les nouvelles données dans le fichier JSON
        file_put_contents('activities.json', json_encode($activities));

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Activité non trouvée']);
    }
}
?>
