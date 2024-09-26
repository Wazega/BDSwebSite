<?php
// Récupérer les données POST envoyées par le fetch
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    // Récupérer les valeurs
    $selections = [
        'sport1' => $data['sport1'],
        'sport2' => $data['sport2'],
        'sport3' => $data['sport3'],
        'sport4' => $data['sport4'],
        'sport5' => $data['sport5'],
        'sport6' => $data['sport6']
    ];

    // Sauvegarder ces informations dans un fichier JSON
    file_put_contents('selections.json', json_encode($selections));

    // Retourner une réponse JSON
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune donnée reçue']);
}
?>