<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $file = '../05_json/planning.json';
        $currentData = json_decode(file_get_contents($file), true);

        $newEvent = [
            'sport' => $data['sport'],
            'startTime' => $data['startTime'],
            'endTime' => $data['endTime'],
            'location' => $data['location'],
            'date' => $data['date']
        ];

        $currentData[] = $newEvent;
        file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
    }
}
?>
