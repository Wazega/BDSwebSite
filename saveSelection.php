<?php
// Récupérer les données POST envoyées par le fetch
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $sport1 = $data['sport1'];
    $sport2 = $data['sport2'];
    $sport3 = $data['sport3'];
    $sport4 = $data['sport4'];
    $sport5 = $data['sport5'];

    // Sauvegarder ces informations dans un fichier
    $selection = "Sport1: $sport1\nSport2: $sport2\nSport3: $sport3\nSport4: $sport4\nSport5: $sport5\n";
    file_put_contents('sport_selection.txt', $selection);

    // Retourner une réponse JSON
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune donnée reçue']);
}
?>
