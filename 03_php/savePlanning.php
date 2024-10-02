<?php
$filePath = '../05_json/planning.json';
$data = json_decode(file_get_contents($filePath), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newEvent = json_decode(file_get_contents('php://input'), true);
    $newEvent['id'] = uniqid(); // Assign a unique ID
    $data[] = $newEvent;
    file_put_contents($filePath, json_encode($data));
    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $deleteVars);
    $id = $deleteVars['id'];
    $data = array_filter($data, function($event) use ($id) {
        return $event['id'] !== $id;
    });
    file_put_contents($filePath, json_encode(array_values($data))); // Re-index the array
    echo json_encode(['success' => true]);
}
?>
