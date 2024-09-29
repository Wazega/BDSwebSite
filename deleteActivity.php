<?php
// Activer l'affichage des erreurs pour faciliter le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Vérifier que la requête est POST et que l'ID est fourni
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si l'ID est envoyé via POST
    if (isset($_POST['id']) && !empty($_POST['id'])) {
        $id = intval($_POST['id']); // Convertir l'ID en entier

        // Charger les activités à partir du fichier JSON
        $file = 'activities.json';
        if (file_exists($file)) {
            $activities = json_decode(file_get_contents($file), true);

            // Vérifier si l'activité existe
            $activityFound = false;
            foreach ($activities as $index => $activity) {
                if ($activity['id'] == $id) {
                    // Supprimer l'activité
                    unset($activities[$index]);
                    $activityFound = true;
                    break;
                }
            }

            if ($activityFound) {
                // Sauvegarder les activités mises à jour dans le fichier JSON
                file_put_contents($file, json_encode(array_values($activities), JSON_PRETTY_PRINT));

                // Envoyer une réponse JSON de succès
                echo json_encode([
                    'success' => true,
                    'message' => 'Activité supprimée avec succès.'
                ]);
            } else {
                // Si l'activité avec cet ID n'existe pas
                echo json_encode([
                    'success' => false,
                    'message' => 'Activité non trouvée.'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Fichier des activités non trouvé.'
            ]);
        }
    } else {
        // ID non fourni
        echo json_encode([
            'success' => false,
            'message' => 'ID d\'activité non fourni.'
        ]);
    }
} else {
    // Méthode non autorisée
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée. Utilisez POST.'
    ]);
}
?>
