<?php
// Charger le fichier JSON des activités
$file = 'activities.json';
if (file_exists($file)) {
    $activities = json_decode(file_get_contents($file), true);
    echo json_encode($activities);
} else {
    echo json_encode([]);
}
?>
