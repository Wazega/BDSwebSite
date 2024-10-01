<?php
    $filename = '../05_json/planning.json';

    // Récupérer le contenu existant
    $events = [];
    if (file_exists($filename)) {
        $events = json_decode(file_get_contents($filename), true);
    }

    // Récupérer les nouvelles données
    $input = json_decode(file_get_contents('php://input'), true);

    if ($input) {
        // Ajouter l'événement
        $events[] = $input;

        // Sauvegarder les événements
        file_put_contents($filename, json_encode($events));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
?>
