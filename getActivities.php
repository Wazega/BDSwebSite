<?php
// Charger les activités depuis le fichier JSON
$activities = json_decode(file_get_contents('activities.json'), true);
echo json_encode($activities);
?>
