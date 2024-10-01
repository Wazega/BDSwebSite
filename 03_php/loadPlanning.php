<?php
$file = '../05_json/planning.json';
if (file_exists($file)) {
    $data = file_get_contents($file);
    echo $data;
} else {
    echo json_encode([]);
}
?>
