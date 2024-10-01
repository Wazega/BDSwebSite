<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $file = '../05_json/planning.json';
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([]));
    }
    
    $currentData = json_decode(file_get_contents($file), true);
    $currentData[] = $data;
    file_put_contents($file, json_encode($currentData));
    
    echo json_encode(['status' => 'success', 'message' => 'Activité sauvegardée.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la sauvegarde.']);
}
?>
