<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Récupérer l'ID de l'activité à supprimer
    $activityId = $_GET['id'];

    // Charger les activités existantes
    $activities = json_decode(file_get_contents('activities.json'), true);

    // Trouver et supprimer l'activité correspondante
    foreach ($activities as $index => $activity) {
        if ($activity['id'] === $activityId) {
            // Supprimer le fichier image du serveur
            if (file_exists($activity['imagePath'])) {
                unlink($activity['imagePath']);
            }

            // Supprimer l'activité du tableau
            unset($activities[$index]);

            // Sauvegarder les nouvelles données
            file_put_contents('activities.json', json_encode(array_values($activities)));

            echo json_encode(['status' => 'success']);
            exit;
        }
    }

    echo json_encode(['status' => 'error', 'message' => 'Activité non trouvée']);
}
?>
