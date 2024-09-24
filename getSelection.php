<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérifie si un fichier de sélection existe
if (file_exists('selections.json')) {
    $selections = json_decode(file_get_contents('selections.json'), true);
    echo json_encode(['selections' => $selections]);
} else {
    // Si le fichier n'existe pas, on retourne un tableau vide
    echo json_encode(['selections' => []]);
}
