<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Récupérer l'ID de l'activité à partir de la requête
    parse_str(file_get_contents("php://input"), $data);
    $activityId = $data['id'] ?? null;

    if (!$activityId) {
        echo json_encode(['status' => 'error', 'message' => 'ID d\'activité non fourni.']);
        exit;
    }

    // Chemin du fichier JSON
    $filePath = 'activities.json';

    // Lire le fichier JSON
    if (!file_exists($filePath)) {
        echo json_encode(['status' => 'error', 'message' => 'Fichier JSON non trouvé.']);
        exit;
    }

    $activities = json_decode(file_get_contents($filePath), true);

    if ($activities === null) {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la lecture du fichier JSON.']);
        exit;
    }

    // Rechercher l'activité par ID
    $found = false;
    foreach ($activities as $index => $activity) {
        if ($activity['id'] == $activityId) {
            // Supprimer l'activité
            unset($activities[$index]);
            $found = true;
            break;
        }
    }

    if (!$found) {
        echo json_encode(['status' => 'error', 'message' => 'Activité non trouvée.']);
        exit;
    }

    // Réindexer le tableau pour enlever les trous après la suppression
    $activities = array_values($activities);

    // Enregistrer les modifications dans le fichier JSON
    file_put_contents($filePath, json_encode($activities, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'message' => 'Activité supprimée avec succès.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée.']);
}
