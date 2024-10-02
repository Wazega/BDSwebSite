<?php
$filePath = '../05_json/planning.json';
$data = json_decode(file_get_contents($filePath), true);
echo json_encode($data);
?>
