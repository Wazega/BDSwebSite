<?php
// Charger les activités depuis le fichier JSON
header('Content-Type: application/json');
if (file_exists('activities.json')) {
    $activities = json_decode(file_get_contents('activities.json'), true);
    echo json_encode($activities);
} else {
    echo json_encode([]);
}
?>
