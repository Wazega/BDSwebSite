<?php
$file = '../05_json/planning.json';
if (file_exists($file)) {
    $planning = json_decode(file_get_contents($file), true);
    echo json_encode($planning);
} else {
    echo json_encode([]);
}
?>
