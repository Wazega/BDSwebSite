<?php
$filename = '../05_json/planning.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $activity = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($activity['sport'], $activity['date'], $activity['location'], $activity['startTime'], $activity['endTime'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }

    // Load existing data
    $data = json_decode(file_get_contents($filename), true);

    // Assign an ID to each activity
    $activity['id'] = uniqid();

    // Add new activity
    $data[] = $activity;

    // Save the updated data
    if (file_put_contents($filename, json_encode($data))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
